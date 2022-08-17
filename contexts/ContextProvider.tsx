import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext({})

interface ContextProps {
    children: React.ReactNode
}

export const ContextProvider = (props: ContextProps) => {
  const { children } = props

  // Global State
  const [colHide, setColHide] = useState(false)

  // Auth State
  const [authName, setAuthName] = useState('Wildan')

  // Editor State
  const [language, setLanguage] = useState('63')
  const [theme, setTheme] = useState('vs')

  // Export global state here
  const states = {
    colHide
  }

  // Export collaboration state here
  const collabStates = {
    colHide,
    setColHide
  }

  // Export global auth state here
  const authStates = {
    authName,
    setAuthName
  }

  // Export global editor state here
  const editorStates = {
    language,
    setLanguage,
    theme,
    setTheme
  }

  return (
    <StateContext.Provider value={{ states, authStates, editorStates, collabStates }}>
        {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
