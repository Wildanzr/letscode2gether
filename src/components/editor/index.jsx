import langConfig from '../../config/langConfig.json'
import { themeList } from '../../constants/themeList'
import { defineTheme } from '../../libs/defineTheme'
import { themeDropDown } from '../../constants/themeDropdown'
import { languageOptions } from '../../constants/languageOptions'

import { useCallbackPrompt } from '../../hooks/useCallbackPrompt'

import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import Dropdown from './Dropdown'
import TextEditor from './TextEditor'
import LangDropdown from './LangDropdown'

import Cookies from 'js-cookie'

const Editor = () => {
  // Global States
  const { editorState, globalFunctions, globalState } = useGlobal()
  const { setTheme } = editorState
  const { mySwal } = globalFunctions
  const { setIsTourNeverShow } = globalState

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Collab States
  const { collabStates, problemStates } = useCollab()
  const { setLanguage, guestName, roomId, socket } = collabStates
  const { languageList } = problemStates

  // Callback Prompt Hook
  const [showPrompt, cancelNavigation, confirmNavigation] = useCallbackPrompt(true)

  // Local States
  const [languageAllowed, setLanguageAllowed] = useState(
    languageList === null
      ? languageOptions
      : languageOptions.filter((lang) => languageList.includes(lang.id))
  )

  // Local Variables
  let rId = roomId

  const changeTheme = async (value) => {
    setTheme(value)
    await defineTheme(value)
  }

  const changeLanguage = (value) => {
    setLanguage(value)

    const payload = {
      roomId,
      language: value
    }

    socket.emit('req_update_lang', payload)
  }

  const forceLeaveRoom = () => {
    const payload = {
      userId: user && user._id ? user.username : guestName,
      roomId: rId
    }

    setTimeout(() => {
      socket.emit('req_leave_room', payload)
    }, 1000)
  }

  // Show help
  const showHelp = () => {
    setIsTourNeverShow(true)
    Cookies.remove('isTourNeverShow')

    setTimeout(() => {
      setIsTourNeverShow(false)
    }, 500)
  }

  // Change theme
  useEffect(() => {
    themeList.forEach(async (theme) => {
      await defineTheme(theme)
    })

    return () => {
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

  // Monitor roomId
  useEffect(() => {
    rId = roomId
  }, [roomId])

  // Monitor showPrompt state
  useEffect(() => {
    if (showPrompt) {
      mySwal.fire({
        icon: 'warning',
        title: langConfig.dialogLeaveRoom,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: langConfig.dialogLeave,
        cancelButtonText: langConfig.dialogStay,
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: true,
        preConfirm: () => {
          forceLeaveRoom()
          confirmNavigation()
        }
      }).then((result) => {
        if (result.isDismissed) {
          cancelNavigation()
        }
      })
    }
  }, [showPrompt])

  return (
    <div className='w-full flex flex-col'>
      {!location.pathname.includes('collab') && (
        <div className="flex w-full px-5 items-start justify-start">
          <button onClick={() => showHelp()} className='flex pb-2 items-start justify-start text-success font-semibold'>{langConfig.collabHelp}</button>
        </div>
      )}
      <div className="flex flex-row w-full px-5 space-x-4 items-start justify-start">
        <div className="rt-language">
          <LangDropdown
            options={languageAllowed}
            placeholder={langConfig.editorSelectLanguage}
            onChange={changeLanguage}
          />
        </div>

        <div className="rt-theme">
          <Dropdown
            options={themeDropDown}
            placeholder={langConfig.editorSelectTheme}
            onChange={changeTheme}
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-[60vh]">
        <TextEditor />
      </div>
    </div>
  )
}

export default Editor
