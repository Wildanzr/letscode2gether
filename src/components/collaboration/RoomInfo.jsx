import langConfig from '../../config/langConfig.json'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import { CollabInfo } from '../other'

import Draggable from 'react-draggable'
import { useParams } from 'react-router-dom'
import { customAlphabet } from 'nanoid'

// Random guest name
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ', 5)
const guestName = `Guest-${nanoid()}`

const RoomInfo = () => {
  // useParams
  const { competeProblemId = 'collaboration' } = useParams()

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  const { collabStates } = useCollab()
  const { roomId } = collabStates

  // Local States
  const [collab, setCollab] = useState(false)
  const [visible, setVisible] = useState(true)
  // Open collaboration video
  const openCollaboration = () => {
    setCollab(true)

    const domain = 'meet.jit.si'
    const options = {
      roomName: `letscode-collaborative-${roomId}`,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#meet'),
      configOverwrite: {
        // startAudioOnly: true, // Only send audio
        startWithAudioMuted: false,
        startWithVideoMuted: true,
        resolution: 360,
        disableProfile: true,
        hideEmailInSettings: true,
        prejoinPageEnabled: false,
        disableModeratorIndicator: true,
        disableSelfView: true,
        disableSelfViewSettings: true,
        toolbarButtons: ['microphone', 'camera', 'toggle-camera', '__end']
      },
      interfaceConfigOverwrite: {
        TOOLBAR_ALWAYS_VISIBLE: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
      },
      userInfo: {
        displayName: user ? user.username : guestName
      }
    }
    // eslint-disable-next-line no-undef
    setTimeout(() => new JitsiMeetExternalAPI(domain, options), 1000)
  }

  // remove jitsi meet iframe
  const removeCollab = (id) => {
    setCollab(false)
    setVisible(false)

    setTimeout(() => {
      setVisible(true)
    }, 1000)
  }

  return (
    <div className="flex flex-row w-full max-h-full py-2 items-center justify-between font-ubuntu text-main dark:text-snow duration-300 ease-in-out">
      <CollabInfo competeProblemId={competeProblemId} guestName={guestName} />

      <Draggable handle="strong" position={collab ? undefined : ({ x: 0, y: 0 })}>
        <div className={`flex ${collab ? 'absolute z-50 top-0 bottom-0 right-0' : ''} flex-col w-[30%] max-h-[70%]`}>
          {collab
            ? (
            <strong className="flex flex-row justify-start items-center px-5 py-2 bg-gray-900 text-white border-b-2 border-white hover:border-blue-500 duration-300">
              <p className="flex w-10/12 mb-0 cursor-move">
                {langConfig.collabCommunication}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x-lg flex w-2/12 hover:fill-white duration-300" viewBox="0 0 16 16" onClick={() => removeCollab('meet')}>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>

            </strong>
              )
            : (
            <button
                onClick={openCollaboration}
                className="flex py-2 px-2 rounded-sm border-b-2 tracking-wide bg-easy dark:bg-main text-snow border-white hover:border-medium dark:hover:border-blue-500  duration-300"
              >
                {langConfig.collabOpenCommunication}
              </button>
              )
          }
          {visible && (<div className="flex flex-col h-full max-w-full items-center justify-center text-white" id="meet" />) }
        </div>
      </Draggable>
    </div>
  )
}

export default RoomInfo
