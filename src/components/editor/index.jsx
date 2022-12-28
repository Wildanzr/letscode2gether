import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'

import Dropdown from './Dropdown'
import TextEditor from './TextEditor'
import LangDropdown from './LangDropdown'

import { languageOptions } from '../../constants/languageOptions'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import { themeList } from '../../constants/themeList'
import { defineTheme } from '../../libs/defineTheme'
import { themeDropDown } from '../../constants/themeDropdown'

const Editor = () => {
  // Global States
  const { editorState } = useGlobal()
  const { setTheme } = editorState

  // Collab States
  const { collabStates, problemStates } = useCollab()
  const { setLanguage } = collabStates
  const { languageList } = problemStates

  // Local States
  const [languageAllowed, setLanguageAllowed] = useState(
    languageList === null
      ? languageOptions
      : languageOptions.filter((lang) => languageList.includes(lang.id))
  )

  const handleLanguageChange = async (value) => {
    setTheme(value)
    await defineTheme(value)
  }

  // Change theme
  useEffect(() => {
    themeList.forEach(async (theme) => {
      await defineTheme(theme)
    })
  }, [])

  // Monitor languageList
  useEffect(() => {
    setLanguageAllowed(
      languageList === null
        ? languageOptions
        : languageOptions.filter((lang) => languageList.includes(lang.id))
    )
  }, [languageList])

  return (
    <>
      <div className="flex flex-row w-full space-x-4 items-start justify-start">
        <LangDropdown
          options={languageAllowed}
          placeholder={langConfig.editorSelectLanguage}
          onChange={setLanguage}
        />
        <Dropdown
          options={themeDropDown}
          placeholder={langConfig.editorSelectTheme}
          onChange={handleLanguageChange}
        />
      </div>

      <div className="flex flex-col w-full h-[60vh]">
        <TextEditor />
      </div>
    </>
  )
}

export default Editor
