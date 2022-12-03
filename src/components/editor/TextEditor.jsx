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
  const { language, code, setCode, socket, roomId } = collabStates

  // Local state
  const [langValue, setLangValue] = useState('javascript')
  const [defaultTemplate] = useState('// Lets solve this problem!\n// Choose your language and start coding!')

  // Emit code to server
  const changeCode = (value) => {
    const payload = {
      roomId,
      selectedLanguage: language,
      code: value
    }

    socket.emit('req_update_code', payload)

    // socket.emit('req_mvp_code', { code: value, room: 'mvp-1' })
    setCode(value)
  }

  // Hanlde code change
  const handleCode = (res) => {
    console.log(res)
    setCode(res.code)
  }

  // Websocket Listener
  useEffect(() => {
    // Listeners
    socket.on('res_update_code', handleCode)

    // Unlisteners
    return () => {
      socket.off('res_update_code', handleCode)
    }
  }, [socket])

  // Monitor language change, then set intellisense to the language
  useEffect(() => {
    if (language !== null) {
      const lang = languageOptions.find((lang) => lang.id === language)
      setLangValue(lang.value || 'javascript')
      setCode(lang.template || 'console.log("hello, world");')
    }
  }, [language])

  return (
    <Editor
      height={'100%'}
      width={'100%'}
      language={langValue}
      value={code}
      theme={theme}
      defaultValue={defaultTemplate}
      onChange={changeCode}
    />
  )
}

export default TextEditor
