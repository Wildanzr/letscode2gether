import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import { languageOptions } from '../../constants/languageOptions'
import MonacoEditor from './MonacoEditor'

const TextEditor = () => {
  // Global States
  const { editorState, globalFunctions } = useGlobal()
  const { theme } = editorState
  const { mySwal } = globalFunctions

  // Collab States
  const { collabStates } = useCollab()
  const { socket, language, setLanguage, roomId, loadingEditor, setLoadingEditor } = collabStates

  // Local state
  const [langValue, setLangValue] = useState('javascript')
  const [defaultTemplate] = useState(langConfig.editorTemplate)

  const setIntelisense = (language) => {
    const lang = languageOptions.find((lang) => lang.id === language)
    setLangValue(lang.value || 'javascript')
    setLanguage(lang.id || null)
  }

  const handleChangeLanguage = (res) => {
    if (res.status) {
      const { language } = res.data
      setIntelisense(language)
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

  useEffect(() => {
    if (loadingEditor) {
      setLoadingEditor(false)
    }
  }, [loadingEditor])

  // Monitor language change, then set intellisense to the language
  useEffect(() => {
    if (language !== null) {
      setIntelisense(language)
    }
  }, [language])

  // Monitor socket
  useEffect(() => {
    socket.on('res_update_lang', handleChangeLanguage)

    return () => {
      socket.off('res_update_lang', handleChangeLanguage)
    }
  })

  return (
    <>
      {loadingEditor
        ? null
        : <MonacoEditor
            language={langValue}
            defaultValue={defaultTemplate}
            theme={theme}
            roomId={roomId}
          />
      }
    </>
  )
}

export default TextEditor
