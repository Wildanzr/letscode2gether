import { useState } from 'react'
import Script from 'next/script'

declare const JitsiMeetExternalAPI:any
const RoomInfo = () => {
  const [collab, setCollab] = useState(false)

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
    return new JitsiMeetExternalAPI(domain, options)
  }

  return (
    <>
    <Script src="https://meet.jit.si/external_api.js" strategy='beforeInteractive'/>
    <div className="flex flex-row w-full max-h-full py-2 items-center justify-between" >
      <div className="flex flex-col text-white">
        <p className="m-0">
          Driver: Wildanzr
          <br />
          Navigator: Azmi
          <br />
          Room Id: 12345
        </p>
      </div>

      <div className="flex flex-col px-2 py-2 h-full max-w-full items-center justify-center text-white" id='meet' >
        {collab
          ? (
            <div className="flex w-full h-full" />
            )
          : (
        <button onClick={openCollaboration} className="flex py-1 px-2 bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300">
          Open Communication
        </button>
            )}
      </div>
    </div>
    </>
  )
}

export default RoomInfo
