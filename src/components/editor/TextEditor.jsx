import { useState, useEffect } from 'react'

import Editor from '@monaco-editor/react'

import { languageOptions } from '../../constants/languageOptions'
import { useGlobalContext } from '../../contexts/GlobalContext'

const TextEditor = () => {
  const { editorState } = useGlobalContext()

  const { language, theme } = editorState

  // Local state
  const [langValue, setLangValue] = useState('javascript')
  const [templateValue, setTemplateValue] = useState('')

  // Monitor language change, then set intellisense to the language
  useEffect(() => {
    const lang = languageOptions.find((lang) => lang.id === language)
    setLangValue(lang?.value || 'javascript')
    setTemplateValue(lang?.template || 'console.log("hello, world");')
  }, [language])

  return (
    <Editor
      height={'100%'}
      width={'100%'}
      language={langValue}
      value={templateValue}
      theme={theme}
      defaultValue="// Lets solve this problem!"
      onChange={() => console.log('changed')}
    />
  )
}

export default TextEditor
