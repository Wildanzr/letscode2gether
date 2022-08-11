// @ts-nocheck
import Script from 'next/script'

import { useStateContext } from '../contexts/ContextProvider'

import { Button } from 'antd'

const AudioVideoCall = () => {
  const { roomStates }: any = useStateContext()
  const { roomConnect, setRoomConnect } = roomStates

  const createRoom = () => {
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
    return new JitsiMeetExternalAPI(domain, options)
  }

  const start = () => {
    setRoomConnect(true)
    createRoom()
  }

  return (
    <>
    <Script src="https://meet.jit.si/external_api.js" />
    <div className="flex h-full items-center justify-center" id="meet">
      <div className={`${roomConnect ? 'hidden' : ''}`}>
        <Button type="primary" onClick={start}>
          {roomConnect ? 'Close' : 'Start Communication'}
        </Button>
      </div>
    </div>
    </>
  )
}

export default AudioVideoCall
