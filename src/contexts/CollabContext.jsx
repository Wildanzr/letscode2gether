import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const CollabContext = createContext()

export const CollabProvider = ({ children }) => {
  // Collab State
  const [driver, setDriver] = useState('Wildanzr')
  const [navigator, setNavigator] = useState('Azmi')
  const [language, setLanguage] = useState(63)
  const [code, setCode] = useState('console.log("Hello world")')
  const [btnDisabled, setBtnDisabled] = useState(false)

  // Problem and Solution State
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [runMode, setRunMode] = useState(null)
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

  // Custom sleep function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  // Submission Functions
  const submission = async (config, mode) => {
    // Set loading and disable button
    setLoading(true)
    setBtnDisabled(true)

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

      // Temporary result
      const tempResults = []
      // Iterate through tokens for checkStatus
      for (const token of tokens) {
        let tmpRes = {
          statusId: 1,
          data: null
        }

        // Check if status is still processing or in queue
        while (tmpRes.statusId === 1 || tmpRes.statusId === 2) {
          const res = await checkStatus(token)
          tmpRes = res
          sleep(2000)
        }

        // Push result to tempResults
        tempResults.push(tmpRes.data)
      }

      // Set result and close loading
      setResult(tempResults)
      setLoading(false)
      setBtnDisabled(false)
      setRunMode(mode)
      console.log('result', tempResults)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setBtnDisabled(false)
      setRunMode(mode)
    }
  }

  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
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
    driver,
    setDriver,
    navigator,
    setNavigator,
    language,
    setLanguage,
    code,
    setCode
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
    result,
    runMode,
    setRunMode,
    btnDisabled,
    setBtnDisabled
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
