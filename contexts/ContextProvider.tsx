import React, { createContext, useContext, useState } from 'react'

import { languageOptions } from '../constants/languageOptions'
import { defaultLanguage } from '../constants/defaultLanguage'

const StateContext = createContext({})

interface ContextProps {
    children: React.ReactNode
}

export const ContextProvider = (props: ContextProps) => {
  const { children } = props

  // Global State
  const [colSideHide, setColSideHide] = useState(false)
  const [colOutputHide, setColOutputHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('Problems')
  const [colSideKey, setColSideKey] = useState('problems')
  const [colTheme, setColTheme] = useState('amy')

  // Room State
  const [roomConnect, setRoomConnect] = useState(false)

  // Auth State
  const [authName, setAuthName] = useState('Wildan')

  // Language State
  const [ideCode, setIdeCode] = useState(defaultLanguage[0].template)
  const [ideLang, setIdeLang] = useState(languageOptions[0].value)

  // Export global state here
  const states:any = {
    colSideHide,
    setColSideHide,
    colOutputHide,
    setColOutputHide,
    colSideContent,
    setColSideContent,
    colSideKey,
    setColSideKey,
    colTheme,
    setColTheme
  }

  // Export global auth state here
  const authStates = {
    authName,
    setAuthName
  }

  // Export room state here
  const roomStates = {
    roomConnect,
    setRoomConnect
  }

  // Export language state here
  const langStates = {
    ideCode,
    setIdeCode,
    ideLang,
    setIdeLang
  }

  return (
    <StateContext.Provider value={{ states, authStates, roomStates, langStates }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
