import langConfig from '../../config/langConfig.json'
import { useState, useEffect, useRef } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'
import { useAuth } from '../../contexts/AuthContext'

import Editor from '@monaco-editor/react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import randomColor from 'randomcolor'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { message } from 'antd'

const MonacoEditor = (props) => {
  // Props destructure
  const { language, theme, roomId } = props

  // Get params
  const { competeProblemId = 'collaboartion' } = useParams()

  // Global States
  const { globalState } = useGlobal()
  const { setColHide, setColSideContent } = globalState

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Collab States
  const { collabStates } = useCollab()
  const { setCode, guestName, isPrivate } = collabStates

  // Local states
  const editorRef = useRef(null)
  const [editorReady, setEditorReady] = useState(false)
  const [customCss, setCustomCss] = useState('.user { }')
  const [renderCss, setRenderCss] = useState(true)

  // Local variables
  let ydoc = null
  let provider = null
  let totalParticipants = 0
  const HOST = import.meta.env.VITE_SOCKET_HOST

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    setEditorReady(true)
  }

  const addCustomCss = (clientId, color, name) => {
    return `.yRemoteSelection-${clientId} {
      background-color: ${color};
    } .yRemoteSelectionHead-${clientId} {
      position: absolute;
      border-left: ${color} solid 2px;
      border-top: ${color} solid 2px;
      border-bottom: ${color} solid 2px;
      background-color: ${color};
      height: 100%;
      box-sizing: border-box;
    } .yRemoteSelectionHead-${clientId}::after {
      position: absolute;
      content: "${name}";
      border: 1px solid ${color};
      background-color: ${color};
      border-radius: 4px;
      padding: 2px;
      top: 100%;
    }`
  }

  const createRoom = (joinedRoom) => {
    ydoc = new Y.Doc()
    provider = new WebsocketProvider(HOST, roomId, ydoc)
    const ytext = ydoc.getText('monaco')

    const randColor = randomColor({
      luminosity: 'dark',
      format: 'rgba',
      alpha: 1
    })

    // Awareness protocol is used to propagate your information (cursor position , name , etc)
    provider.awareness.setLocalStateField('user', {
      name: user && user._id ? user.username : guestName,
      color: randColor
    })

    // eslint-disable-next-line no-unused-vars
    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    )

    // Check if any code is saved in cookie
    setTimeout(() => {
      if (isPrivate) {
        const code = Cookies.get(competeProblemId)
        if (code) {
          editorRef.current.setValue(code)
          setCode(editorRef.current.getValue())
          message.info(langConfig.editorCodeRestore)
        }
      }
    }, 1000)
  }

  // Update monaco value when code state changes
  useEffect(() => {
    if (editorReady) {
      createRoom(roomId)

      // You can observe when a user updates their awareness information
      provider.awareness.on('update', (changes) => {
        // Update code
        setCode(editorRef.current.getValue())

        // If room is private, save code to cookie for 30 days
        if (isPrivate) {
          Cookies.set(competeProblemId, editorRef.current.getValue(), { expires: 30 })
        }

        // Update user list
        const users = Array.from(provider.awareness.states)
        if (users.length !== totalParticipants) {
          let tempCssValue = ''
          users.forEach((user) => {
            tempCssValue += `${addCustomCss(user[0], user[1].user.color, user[1].user.name)} `
          })
          setRenderCss(true)
          setCustomCss(tempCssValue)
        }
        totalParticipants = users.length
      })
    }

    return () => {
      // Releasing the resources used and destroying the document
      if (provider) {
        provider.disconnect()
        ydoc.destroy()
      }
    }
  }, [editorReady])

  // Monitor renderCss state
  useEffect(() => {
    if (renderCss) {
      setRenderCss(false)
    }
  }, [renderCss])

  // Determine if collaboration or compete problem
  useEffect(() => {
    if (competeProblemId !== 'collaboartion') {
      setColHide(true)
      setColSideContent('problems')
    } else {
      setColHide(false)
    }
  }, [])

  return (
    <div className={'flex flex-col px-5 py-5 w-full h-full'}>
      {renderCss
        ? null
        : <style>{`${customCss}`}</style>
      }
      <Editor
        height={'100%'}
        width={'100%'}
        language={language}
        theme={theme}
        onMount={handleEditorDidMount}
      />
    </div>
  )
}

export default MonacoEditor
