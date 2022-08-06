import React, { createContext, useContext, useState } from 'react'

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

  return (
    <StateContext.Provider value={{ states, authStates, roomStates }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
