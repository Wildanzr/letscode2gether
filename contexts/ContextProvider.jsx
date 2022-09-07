import { createContext, useContext, useState } from 'react'

const StateContext = createContext({})

export const ContextProvider = (props) => {
  const { children } = props

  // Global State
  const [colHide, setColHide] = useState(false)

  // Auth State
  const [authName, setAuthName] = useState('Wildan')

  // Export global state here
  const states = {
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
