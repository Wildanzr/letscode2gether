import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import { languageOptions } from '../../constants/languageOptions'
import MonacoEditor from './MonacoEditor'

const TextEditor = () => {
  // Global States
  const { editorState } = useGlobal()
  const { theme } = editorState

  // Collab States
  const { collabStates } = useCollab()
  const { language, setCode, roomId, loadingEditor, setLoadingEditor } = collabStates

  // Local state
  const [langValue, setLangValue] = useState('javascript')
  const [defaultTemplate] = useState(langConfig.editorTemplate)

  useEffect(() => {
    if (loadingEditor) {
      setLoadingEditor(false)
    }
  }, [loadingEditor])

  // Monitor language change, then set intellisense to the language
  useEffect(() => {
    if (language !== null) {
      const lang = languageOptions.find((lang) => lang.id === language)
      setLangValue(lang.value || 'javascript')
      setCode(lang.template || 'console.log("hello, world");')
    }
  }, [language])

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
