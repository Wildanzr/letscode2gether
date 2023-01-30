import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import { Typography, Input, Spin, message } from 'antd'

const { Paragraph } = Typography

const CollabInfo = (props) => {
  // Props destructure
  const { competeProblemId, guestName } = props

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Collab States
  const { collabStates } = useCollab()
  const {
    socket,
    roomId,
    setRoomId,
    setLanguage,
    setLoadingEditor,
    isPrivate,
    setIsPrivate
  } = collabStates

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [inputRoomId, setInputRoomId] = useState(null)
  const [driver, setDriver] = useState(null)
  const [participants, setParticipants] = useState(null)
  const [initRoom, setInitRoom] = useState(true)

  // Create room
  const createRoom = async () => {
    const payload = {
      userId: user && user._id ? user._id : guestName,
      competeProblemId
    }

    // Reset driver
    setDriver(null)
    setRoomId(null)
    setParticipants(null)
    setLoadingEditor(true)

    socket.emit('req_create_room', payload)
  }

  // Handle create room response
  const handleCreateRoom = (res) => {
    const { codeId, participants } = res.data
    setDriver(participants[0].username)
    setRoomId(codeId)

    // Determine participants
    const participantsList = isPrivate ? [] : participants
    setParticipants(participantsList)
  }

  // Join room
  const joinRoom = () => {
    if (inputRoomId === null || inputRoomId === '') {
      message.error(langConfig.collabRoomWarn1)
      return
    } else if (inputRoomId.length < 5 || inputRoomId.length > 5) {
      message.error(langConfig.collabRoomWarn2)
      return
    }

    // Create paylod
    const payload = {
      userId: user ? user._id : guestName,
      roomId: inputRoomId,
      competeProblemId
    }

    // Show loading
    mySwal.fire({
      title: langConfig.loadingJoinRoom,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Emit join room
    socket.emit('req_join_room', payload)
  }

  // Handle join room
  const handleJoinRoom = (res) => {
    if (res.status) {
      const { collaboration } = res.data
      const { codeId, participants, language } = collaboration
      const newDriver = participants[0].username

      // Set values
      setRoomId(codeId)
      setDriver(newDriver)
      setLoadingEditor(true)

      // Set collaboration language
      if (language) setLanguage(language)

      // Determine participants
      const participantList = !isPrivate
        ? participants.filter(
          (participant) => participant.username !== user.username
        )
        : participants.filter(
          (participant) => participant.username !== newDriver
        )

      setIsPrivate(false)
      setParticipants(participantList)

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

    // Destructure data
    const { participants } = res.data
    const newDriver = participants[0].username

    // Show notification
    message.info(langConfig.infoSomeoneJoined)

    // Determine participants
    const participantList = !isPrivate
      ? participants.filter((participant) =>
        user
          ? participant.username !== user.username
          : participant.username !== guestName
      )
      : participants.filter(
        (participant) => participant.username !== newDriver
      )

    setParticipants(participantList)
  }

  // Handle update participants left response
  const handleUpdateParticipantsLeft = (res) => {
    // Reset participants
    setParticipants(null)

    // Destructure data
    const { participants } = res.data
    const newDriver = participants[0].username
    setDriver(newDriver)

    // Show notification
    message.info(langConfig.infoSomeoneLeft)

    // Determine participants
    const participantList = !isPrivate
      ? participants.filter((participant) =>
        user
          ? participant.username !== user.username
          : participant.username !== guestName
      )
      : participants.filter(
        (participant) => participant.username !== newDriver
      )

    setParticipants(participantList)
  }

  // Leave room
  const leaveRoom = () => {
    // Show dialog
    mySwal
      .fire({
        title: langConfig.dialogLeftRoom,
        showDenyButton: true,
        confirmButtonText: 'Keluar',
        confirmButtonColor: '#ff4d4f',
        denyButtonText: 'Tetap disini',
        denyButtonColor: '#1890ff',
        reverseButtons: true,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Create payload
          const payload = {
            userId: user && user._id ? user.username : guestName,
            roomId: inputRoomId
          }

          // Emit leave room
          socket.emit('req_leave_room', payload)
        }
      })
  }

  // Handle leave room response
  const handleLeaveRoom = (res) => {
    if (res.status) {
      message.info(langConfig.infoMeLeftRoom)
      setIsPrivate(true)
      createRoom()
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

  // Initaily request for room ID
  useEffect(() => {
    if (initRoom) {
      createRoom()
      setInitRoom(false)
    }
  }, [initRoom])

  // Websocket Listeners
  useEffect(() => {
    // Initially request for room ID, this line works when user refreshes the page
    socket.on('connect', () => {
      setInitRoom(true)
    })

    // Listeners
    socket.on('res_create_room', handleCreateRoom)
    socket.on('res_join_room', handleJoinRoom)
    socket.on('res_update_participants', handleUpdateParticipants)
    socket.on('res_participants_left', handleUpdateParticipantsLeft)
    socket.on('res_leave_room', handleLeaveRoom)

    // Unlisteners
    return () => {
      socket.off('res_create_room', handleCreateRoom)
      socket.off('res_join_room', handleJoinRoom)
      socket.off('res_update_participants', handleUpdateParticipants)
      socket.off('res_participants_left', handleUpdateParticipantsLeft)
      socket.off('res_leave_room', handleLeaveRoom)
    }
  }, [socket])

  return (
    <div className="flex flex-col space-y-1">
      <div className="rt-collab-info flex flex-col">
        <div className="flex flex-row space-x-2">
          <p className="mb-0">{langConfig.collabDriver}</p>
          <div className="mb-0 font-bold">
            {driver === null ? <Spin size="small" /> : driver}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <p className="mb-0">{langConfig.collabNavigator}</p>
          {participants === null
            ? (
            <Spin size="small" />
              )
            : participants.length === 0
              ? (
            <p className="mb-0 font-bold">-</p>
                )
              : (
            <div className="flex flex-col space-y-1">
              <p className="mb-0 font-bold">{participants[0].username}</p>
            </div>
                )}
        </div>

        {participants !== null && participants.length > 1 && (
          <div className="flex flex-row space-x-2">
            <p className="mb-0">{langConfig.collabParticipants}</p>
            {participants === null
              ? (
              <Spin size="small" />
                )
              : participants.length === 0
                ? (
              <p className="mb-0 font-bold">-</p>
                  )
                : (
              <div className="flex flex-col space-y-1">
                {participants.map((participant, index) => {
                  if (index !== 0) {
                    return (
                      <p className="mb-0 font-bold" key={index}>
                        {participant.username}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
                  )}
          </div>
        )}

        <div className="flex flex-row space-x-2 pb-2">
          <p className="mb-0">{langConfig.collabIDRoom}</p>
          {roomId === null
            ? (
            <Spin size="small" />
              )
            : (
            <Paragraph
              copyable
              style={{ marginBottom: 0 }}
              className="mb-0 font-bold text-main dark:text-snow duration-300 ease-in-out"
            >
              {roomId}
            </Paragraph>
              )}
        </div>
      </div>

      <div className="flex flex-row space-x-2">
        <div className="flex rt-collab-field">
          <Input
            maxLength={5}
            minLength={5}
            allowClear
            disabled={!isPrivate}
            onChange={(e) => setInputRoomId(e.target.value)}
            placeholder={langConfig.formPlaceholderRoomID}
          />
        </div>
        <div className="flex rt-collab-button">
          <button
            onClick={isPrivate ? joinRoom : leaveRoom}
            className={`flex py-1 px-1 lg:px-2 justify-center font-medium whitespace-nowrap ${
              isPrivate
                ? 'bg-easy dark:bg-main hover:border-medium dark:hover:border-blue-500'
                : 'bg-hard dark:hover:border-medium hover:border-medium'
            } rounded-sm border-b-2 text-snow border-white duration-300`}
          >
            {isPrivate ? langConfig.collabRoomJoin : langConfig.collabRoomLeft}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollabInfo
