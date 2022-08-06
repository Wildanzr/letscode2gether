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

  // Export global state here
  const states:any = {
    colHide,
    setColHide
  }

  // Export global auth state here
  const authStates = {
    authName,
    setAuthName
  }

  return (
    <StateContext.Provider value={{ states, authStates }}>
        {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
