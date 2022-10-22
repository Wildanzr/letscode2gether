import { createContext, useContext, useState } from 'react'

import Swal from 'sweetalert2/dist/sweetalert2.all'
import withReactContent from 'sweetalert2-react-content'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // Global state
  const [colHide, setColHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('')
  const [tabs, setTabs] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [paths] = useState([
    {
      to: '/learning-journey',
      name: 'Learning Journey',
      no: 1
    },
    {
      to: '/challenges',
      name: 'Challenge',
      no: 2
    },
    {
      to: '/competes',
      name: 'Compete',
      no: 3
    },
    {
      to: '/leaderboards',
      name: 'Leaderboard',
      no: 4
    }
  ])

  // Global Functions
  const mySwal = withReactContent(Swal)

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
    setColSideContent,
    tabs,
    setTabs,
    paths,
    isOn,
    setIsOn,
    toggle,
    setToggle
  }

  // Export global functions
  const globalFunctions = {
    mySwal
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
    <GlobalContext.Provider value={{ globalState, globalFunctions, editorState }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
