import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import { Typography, Input, Spin, message } from 'antd'

const { Paragraph } = Typography
const CollabInfo = (props) => {
  // Props destructure
  const { competeProblemId } = props

  // Collab States
  const { collabStates } = useCollab()
  const { socket } = collabStates

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [privateRoom, setPrivateRoom] = useState(true)
  const [inputRoomId, setInputRoomId] = useState(null)
  const [participants, setParticipants] = useState(null)
  const [roomId, setRoomId] = useState(null)

  // Create room
  const createRoom = () => {
    const payload = {
      userId: user ? user._id : 'guest',
      competeProblemId
    }

    socket.emit('req_create_room', payload)
  }

  const handleRoomId = (res) => {
    const { codeId } = res.data
    setRoomId(codeId)
    setParticipants([])
  }

  // Handle join room
  const handleJoinRoom = () => {
    if (inputRoomId === null || inputRoomId === '') {
      message.error('Please enter a room ID')
      return
    } else if (inputRoomId.length < 5 || inputRoomId.length > 5) {
      message.error('Room ID consists of 5 characters')
      return
    }

    console.log(inputRoomId)
    setPrivateRoom(!privateRoom)
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
    socket.on('res_create_room', handleRoomId)

    // Unlisteners
    return () => {
      socket.off('res_create_room', handleRoomId)
    }
  }, [socket])
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row space-x-2">
        <p className="mb-0">Driver:</p>
        <p className="mb-0 font-bold">
          {user ? user.username : 'Guest'}
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
                    <p className="mb-0 font-bold" key={index}>{participant}</p>
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
          onClick={handleJoinRoom}
          className="flex py-1 px-1 lg:px-2 justify-center font-medium whitespace-nowrap bg-easy dark:bg-main rounded-sm border-b-2 text-snow border-white hover:border-medium dark:hover:border-blue-500 duration-300"
        >
          {privateRoom ? 'Join Room' : 'Leave Room'}
        </button>
      </div>
    </div>
  )
}

export default CollabInfo
