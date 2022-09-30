import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // Global state
  const [colHide, setColHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('')

  // Editor State
  const [theme, setTheme] = useState('vs')
  const [run, setRun] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [customInput, setCustomInput] = useState(false)

  // Export global state
  const globalState = {
    colHide,
    setColHide,
    colSideContent,
    setColSideContent
  }

  // Export editor state
  const editorState = {
    theme,
    setTheme,
    run,
    setRun,
    showInput,
    setShowInput,
    customInput,
    setCustomInput
  }

  return (
    <GlobalContext.Provider value={{ globalState, editorState }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
