import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // Global state
  const [colHide, setColHide] = useState(false)

  // Editor State
  const [language, setLanguage] = useState('63')
  const [theme, setTheme] = useState('vs')

  // Export global state
  const globalState = {
    colHide,
    setColHide
  }

  // Export editor state
  const editorState = {
    language,
    setLanguage,
    theme,
    setTheme
  }

  return (
    <GlobalContext.Provider value={{ globalState, editorState }}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
