import { useState, useEffect } from 'react'

import { languageOptions } from '../../constants/languageOptions'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import Editor from '@monaco-editor/react'

const TextEditor = () => {
  // Global States
  const { editorState } = useGlobalContext()
  const { theme } = editorState

  // Collab States
  const { collabStates } = useCollab()
  const { language, code, setCode } = collabStates

  // Local state
  const [langValue, setLangValue] = useState('javascript')

  // Handle code change
  const handleCodeChange = (value) => {
    // Todo save current code to db with name of language

    // Save code to state
    // console.log('change', value)
    setCode(value)
  }

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
