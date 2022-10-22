import { useState } from 'react'

import Draggable from 'react-draggable'

const RoomInfo = () => {
  const [collab, setCollab] = useState(false)
  const [visible, setVisible] = useState(true)

  const openCollaboration = () => {
    console.log('Hello')
    setCollab(true)

    const domain = 'meet.jit.si'
    const options = {
      roomName: 'HelloAkuAdaDuaApa',
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
        displayName: 'Saya'
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
    <div className="flex flex-row w-full max-h-full py-2 items-center justify-between">
      <div className="flex flex-col text-white">
        <p className="m-0">
          Driver: Wildanzr
          <br />
          Navigator: Azmi
          <br />
          Room Id: 12345
        </p>
      </div>

      <Draggable handle="strong" position={collab ? undefined : ({ x: 0, y: 0 })}>
        <div className={`flex ${collab ? 'absolute z-50 top-0 bottom-0 right-0' : ''} flex-col w-[30%] max-h-[70%]`}>
          {collab
            ? (
            <strong className="flex flex-row justify-start items-center px-5 py-2 bg-gray-900 text-white border-b-2 border-white hover:border-blue-500 duration-300">
              <p className="flex w-10/12 mb-0 cursor-move">Collaboration</p>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x-lg flex w-2/12 hover:fill-white duration-300" viewBox="0 0 16 16" onClick={() => removeCollab('meet')}>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>

            </strong>
              )
            : (
            <button
                onClick={openCollaboration}
                className="flex py-2 px-2 bg-[#111827] rounded-sm border-b-2 text-white text-center border-white hover:border-blue-500 duration-300"
              >
                Open Communication
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
