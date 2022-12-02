import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import { Typography, Input, Spin, message } from 'antd'
import { customAlphabet } from 'nanoid'

const { Paragraph } = Typography
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ', 5)
// Random guest name
const guestName = `Guest-${nanoid()}`

const CollabInfo = (props) => {
  // Props destructure
  const { competeProblemId } = props

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Collab States
  const { collabStates } = useCollab()
  const { socket } = collabStates

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [privateRoom, setPrivateRoom] = useState(true)
  const [inputRoomId, setInputRoomId] = useState(null)
  const [driver, setDriver] = useState(null)
  const [participants, setParticipants] = useState(null)
  const [roomId, setRoomId] = useState(null)

  // Create room
  const createRoom = () => {
    const payload = {
      userId: user ? user._id : guestName,
      competeProblemId
    }

    // Reset driver
    setDriver(null)
    setRoomId(null)
    setParticipants(null)

    socket.emit('req_create_room', payload)
  }

  // Handle create room response
  const handleCreateRoom = (res) => {
    const { codeId, participants } = res.data
    setDriver(participants[0].username)
    setRoomId(codeId)

    // Determine participants
    const participantsList = privateRoom ? [] : participants
    setParticipants(participantsList)
  }

  // Leave room
  const leaveRoom = () => {
    setPrivateRoom(true)
  }

  // Join room
  const joinRoom = () => {
    if (inputRoomId === null || inputRoomId === '') {
      message.error('Please enter a room ID')
      return
    } else if (inputRoomId.length < 5 || inputRoomId.length > 5) {
      message.error('Room ID consists of 5 characters')
      return
    }

    // Create paylod
    const payload = {
      userId: user ? user._id : guestName,
      roomId: inputRoomId
    }

    // Show loading
    mySwal.fire({
      title: 'Joining room...',
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Emit join room
    socket.emit('req_join_room', payload)
    setPrivateRoom(false)
  }

  // Handle join room
  const handleJoinRoom = (res) => {
    if (res.status) {
      const { collaboration } = res.data
      const { codeId, participants } = collaboration

      // Set room id
      setRoomId(codeId)
      setParticipants(participants)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: res.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    } else {
      console.log(res)
      // Show error
      mySwal.fire({
        icon: 'error',
        title: res.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    }
  }

  // Handle update participants response
  const handleUpdateParticipants = (res) => {
    // Reset participants
    setParticipants(null)

    const { participants } = res.data

    const newParticipants = privateRoom
      ? participants.filter((participant) => user === null ? participant !== guestName : participant !== user._id)
      : participants

    console.log(newParticipants)
    setParticipants(newParticipants)
  }

  // Initaily request for room ID
  useEffect(() => {
    createRoom()
  }, [])

  // Websocket Listeners
  useEffect(() => {
    // Initially request for room ID, this line works when user refreshes the page
    socket.on('connect', () => {
      createRoom()
    })

    // Listeners
    socket.on('res_create_room', handleCreateRoom)
    socket.on('res_join_room', handleJoinRoom)
    socket.on('res_update_participants', handleUpdateParticipants)

    // Unlisteners
    return () => {
      socket.off('res_create_room', handleCreateRoom)
      socket.off('res_join_room', handleJoinRoom)
      socket.off('res_update_participants', handleUpdateParticipants)
    }
  }, [socket])
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row space-x-2">
        <p className="mb-0">Driver:</p>
        <p className="mb-0 font-bold">
          {driver === null
            ? <Spin size="small" />
            : driver
          }
        </p>
      </div>

      <div className="flex flex-row space-x-2">
        <p className="mb-0">Navigator:</p>
        {participants === null
          ? <Spin size='small' />
          : participants.length === 0
            ? <p className="mb-0 font-bold">-</p>
            : <div className="flex flex-col space-y-1">
                {participants.map((participant, index) => (
                    <p className="mb-0 font-bold" key={index}>{participant.username}</p>
                ))}
            </div>
        }
      </div>

      <div className="flex flex-row space-x-2 pb-2">
        <p className="mb-0">Id Room:</p>
        {roomId === null
          ? <Spin size='small' />
          : <Paragraph
            copyable
            style={{ marginBottom: 0 }}
            className="mb-0 font-bold text-main dark:text-snow duration-300 ease-in-out"
          >
            {roomId}
          </Paragraph>
        }
      </div>

      <div className="flex flex-row space-x-2">
        <Input
          maxLength={5}
          minLength={5}
          allowClear
          onChange={(e) => setInputRoomId(e.target.value)}
          placeholder="Enter custom room id"
        />
        <button
          onClick={privateRoom ? joinRoom : leaveRoom}
          className="flex py-1 px-1 lg:px-2 justify-center font-medium whitespace-nowrap bg-easy dark:bg-main rounded-sm border-b-2 text-snow border-white hover:border-medium dark:hover:border-blue-500 duration-300"
        >
          {privateRoom ? 'Join Room' : 'Leave Room'}
        </button>
      </div>
    </div>
  )
}

export default CollabInfo
