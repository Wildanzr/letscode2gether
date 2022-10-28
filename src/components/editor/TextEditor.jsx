import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import { languageOptions } from '../../constants/languageOptions'

import Editor from '@monaco-editor/react'

const TextEditor = () => {
  // Global States
  const { editorState } = useGlobal()
  const { theme } = editorState

  // Collab States
  const { collabStates } = useCollab()
  const { language, code, setCode, socket } = collabStates

  // Local state
  const [langValue, setLangValue] = useState('javascript')

  // Handle code change
  const handleCodeChange = (value) => {
    // Todo save current code to db with name of language

    socket.emit('req_mvp_code', { code: value, room: 'mvp-1' })
    setCode(value)
  }

  // First time join room
  useEffect(() => {
    socket.emit('req_mvp_join', { room: 'mvp-1' })
  }, [])

  // Websocket Listener
  useEffect(() => {
    const handleCode = (res) => {
      setCode(res.code)
    }

    // Listeners
    socket.on('res_mvp_code', handleCode)
    // Join room
    socket.on('connect', () => {
      socket.emit('req_mvp_join', { room: 'mvp-1' })
    })

    // Unlisteners
    return () => {
      socket.off('res_mvp_code', handleCode)
    }
  }, [socket])

  // Monitor language change, then set intellisense to the language
  useEffect(() => {
    const lang = languageOptions.find((lang) => lang.id === language)
    setLangValue(lang.value || 'javascript')

    // Todo check if code is saved in db, if yes, then load it

    setCode(lang.template || 'console.log("hello, world");')
  }, [language])

  return (
    <Editor
      height={'100%'}
      width={'100%'}
      language={langValue}
      value={code}
      theme={theme}
      defaultValue="// Lets solve this problem!"
      onChange={handleCodeChange}
    />
  )
}

export default TextEditor
