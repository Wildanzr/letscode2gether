import langConfig from '../../config/langConfig.json'
import { themeList } from '../../constants/themeList'
import { defineTheme } from '../../libs/defineTheme'
import { themeDropDown } from '../../constants/themeDropdown'
import { languageOptions } from '../../constants/languageOptions'

import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import Dropdown from './Dropdown'
import TextEditor from './TextEditor'
import LangDropdown from './LangDropdown'

const Editor = () => {
  // Global States
  const { editorState } = useGlobal()
  const { setTheme } = editorState

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Collab States
  const { collabStates, problemStates } = useCollab()
  const { setLanguage, guestName, roomId, socket } = collabStates
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

  const forceLeaveRoom = () => {
    const payload = {
      userId: user && user._id ? user.username : guestName,
      roomId
    }

    setTimeout(() => {
      socket.emit('req_leave_room', payload)
    }, 3000)
  }

  // Change theme
  useEffect(() => {
    themeList.forEach(async (theme) => {
      await defineTheme(theme)
    })

    return () => {
      console.log('force leave')
      forceLeaveRoom()
    }
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
