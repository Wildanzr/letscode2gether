import { useEffect } from 'react'

import Dropdown from './Dropdown'
import TextEditor from './TextEditor'

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
  const { collabStates } = useCollab()
  const { setLanguage } = collabStates

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

  return (
    <>
      <div className="flex flex-row w-full space-x-4 items-start justify-start">
        <Dropdown
          options={languageOptions}
          placeholder="Select Language"
          onChange={setLanguage}
        />
        <Dropdown
          options={themeDropDown}
          placeholder="Select Theme"
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
