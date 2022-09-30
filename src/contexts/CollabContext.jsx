import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const CollabContext = createContext()

export const CollabProvider = ({ children }) => {
  // Collab State
  const [driver, setDriver] = useState('Wildanzr')
  const [navigator, setNavigator] = useState('Azmi')
  const [language, setLanguage] = useState(63)
  const [code, setCode] = useState('console.log("Hello world")')

  // Problem and Solution State
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
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
  const submission = async (mode, config, type) => {
    // Set loading to true
    setLoading(true)
    const url = type === 'single'
      ? `${import.meta.env.VITE_RAPID_API_URL}/batch`
      : import.meta.env.VITE_RAPID_API_URL

    let tokens = []

    const options = {
      method: 'POST',
      url,
      params: { base64_encoded: 'true', fields: '*' },
      data: config
    }
    try {
      const res = await axios.request(options)
      if (type === 'single') {
        tokens = res.data.map((data) => data.token)
      } else {
        tokens.push(res.data.token)
      }

      const tempResults = []

      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

      // Iterate through tokens for checkStatus, then console the result
      for (const token of tokens) {
        let tmpRes = {
          statusId: 1,
          data: null
        }
        while (tmpRes.statusId === 1 || tmpRes.statusId === 2) {
          const res = await checkStatus(token)
          tmpRes = res
          sleep(2000)
        }
        tempResults.push(tmpRes.data)
      }
      setResult(tempResults)
      setLoading(false)
      console.log('result', tempResults)
    } catch (error) {
      console.error(error)
      setLoading(false)
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

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
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
      // setProcessing(false)
      // showErrorToast()
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
    result
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
