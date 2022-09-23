import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [colhide, setColhide] = useState(false)

  // Export global state
  const globalState = {
    colhide,
    setColhide
  }

  return (
    <GlobalContext.Provider value={{ globalState }}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
