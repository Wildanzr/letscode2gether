import { createContext, useContext, useState, useEffect } from 'react'

import { useGlobal } from './GlobalContext'

import axios from 'axios'
import { io } from 'socket.io-client'
import { customAlphabet } from 'nanoid'

// Random guest name
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ', 5)

const CollabContext = createContext()

export const CollabProvider = ({ children }) => {
  // Global States
  const { globalState } = useGlobal()
  const { setColHide, setColSideContent } = globalState

  // Socket State
  const [socket, setSocket] = useState({
    on: () => {},
    off: () => {},
    emit: () => {}
  })

  // Connect to Socket Server
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_HOST)
    setSocket(socket)
  }, [])

  // Collab States
  const [roomId, setRoomId] = useState(null)
  const [isPrivate, setIsPrivate] = useState(true)
  const [loadingEditor, setLoadingEditor] = useState(true)
  const [guestName, setGuestName] = useState(`Guest-${nanoid()}`)

  // Editor States
  const [language, setLanguage] = useState(null)
  const [code, setCode] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)

  // Problem and Solution State
  const [competeProblem, setCompeteProblem] = useState(null)
  const [competeMaxPoint, setCompeteMaxPoint] = useState(0)
  const [languageList, setLanguageList] = useState(null)

  const [loading, setLoading] = useState(false)
  const [runMode, setRunMode] = useState(null)

  // Not used anymore
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState([])
  const [sampleTestCase, setSampleTestCase] = useState([
    {
      input: '13',
      expected: 'Tiga Belas'
    },
    {
      input: '45',
      expected: 'Empat Puluh Lima'
    },
    {
      input: '50',
      expected: 'Lima Puluh'
    },
    {
      input: '99',
      expected: 'Sembilan Puluh Sembilan'
    }
  ])
  const [testCase, setTestCase] = useState([
    {
      input: '16',
      expected: 'Enam Belas'
    },
    {
      input: '21',
      expected: 'Dua Puluh Satu'
    },
    {
      input: '100',
      expected: 'Seratus'
    },
    {
      input: '7',
      expected: 'Tujuh'
    }
  ])

  // Submission Functions
  const submission = async (config, mode, type) => {
    // Disable button
    setBtnDisabled(true)

    // Set loading
    if (type === 'run') {
      setLoading(true)
    }

    // Define API URL
    const url = mode === 'single'
      ? import.meta.env.VITE_RAPID_API_URL
      : `${import.meta.env.VITE_RAPID_API_URL}/batch`

    // Define API Payload
    const options = {
      method: 'POST',
      url,
      params: { base64_encoded: 'true', fields: '*' },
      data: config
    }

    // Collet token results
    let tokens = []
    try {
      const res = await axios.request(options)
      if (mode === 'single') {
        tokens.push(res.data.token)
      } else {
        tokens = res.data.map((data) => data.token)
      }

      // Set result
      if (type === 'run') {
        setResult(tokens)

        // Set loading and mode
        setLoading(false)
        setRunMode(mode)
      } else {
        setColHide(true)
        setColSideContent('submissions')
      }

      // Enable button after submission
      setBtnDisabled(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setBtnDisabled(false)
      setRunMode(mode)
    }
  }

  // Check Submission Result
  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_RAPID_API_URL + '/' + token,
      params: {
        base64_encoded: 'true',
        fields: 'expected_output,language,memory,status,stderr,stdin,stdout,time'
      },
      headers: {
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY
      }
    }
    try {
      const response = await axios.request(options)
      const statusId = response.data.status.id

      if (statusId === 1 || statusId === 2) {
        return {
          statusId,
          data: null
        }
      } else {
        return {
          statusId,
          data: response.data
        }
      }
    } catch (err) {
      console.log('err', err)
      return {
        statusId: 13,
        data: null
      }
    }
  }

  // Export collab state
  const collabStates = {
    roomId,
    setRoomId,
    language,
    setLanguage,
    code,
    setCode,
    socket,
    isPrivate,
    setIsPrivate,
    loadingEditor,
    setLoadingEditor,
    guestName,
    setGuestName
  }

  // Export submission functions
  const collabFunctions = {
    submission,
    checkStatus
  }

  // Export problem and solution state
  const problemStates = {
    problem,
    setProblem,
    sampleTestCase,
    setSampleTestCase,
    testCase,
    setTestCase,
    loading,
    setLoading,
    result,
    setResult,
    runMode,
    setRunMode,
    btnDisabled,
    setBtnDisabled,
    competeProblem,
    setCompeteProblem,
    competeMaxPoint,
    setCompeteMaxPoint,
    languageList,
    setLanguageList
  }

  return (
    <CollabContext.Provider
      value={{ collabStates, collabFunctions, problemStates }}
    >
      {children}
    </CollabContext.Provider>
  )
}

export const useCollab = () => useContext(CollabContext)
