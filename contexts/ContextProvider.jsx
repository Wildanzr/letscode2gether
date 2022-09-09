import { createContext, useContext, useState } from 'react'
import { encode } from 'js-base64'
import axios from 'axios'

const StateContext = createContext({})

export const ContextProvider = (props) => {
  const { children } = props

  // Global State
  const [colHide, setColHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('')

  // Auth State
  const [authName, setAuthName] = useState('Wildan')

  // Editor State
  const [language, setLanguage] = useState('63')
  const [theme, setTheme] = useState('vs')

  // Submission State
  const [runConfig, setRunConfig] = useState({
    language_id: '63',
    source_code: encode('console.log("Hello World")'),
    stdin: encode('Hello World')
  })
  const [submitConfig, setSubmitConfig] = useState({
    language_id: '63',
    source_code: encode('console.log("Hello World")'),
    stdin: encode('Hello World'),
    expected_output: encode('Hello World')
  })

  const [runOptions, setRunOptions] = useState({
    method: 'POST',
    url: process.env.NEXT_PUBLIC_RAPID_API_URL,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
    },
    data: runConfig
  })

  const [submitOptions, setSubmitOptions] = useState({
    method: 'POST',
    url: process.env.NEXT_PUBLIC_RAPID_API_URL,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
    },
    data: submitConfig
  })

  // Submission Function
  const submitCode = (mode) => {
    const options = mode === 'run' ? runOptions : submitOptions

    axios.request(options).then(function (response) {
      console.log(response.data)
      checkStatus(response.data.token)
    }).catch(function (error) {
      console.error(error)
    })
  }

  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY
      }
    }
    try {
      const response = await axios.request(options)
      const statusId = response.data.status?.id

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        // setProcessing(false)
        // setOutputDetails(response.data)
        // showSuccessToast('Compiled Successfully!')
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log('err', err)
      // setProcessing(false)
      // showErrorToast()
    }
  }

  // Export global state here
  const states = {
    colHide
  }

  // Export collaboration state here
  const collabStates = {
    colHide,
    setColHide,
    colSideContent,
    setColSideContent
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

  // Export global submission state here
  const submissionStates = {
    runOptions,
    setRunOptions,
    submitOptions,
    setSubmitOptions,
    runConfig,
    setRunConfig,
    submitConfig,
    setSubmitConfig
  }

  // Export editor functions here
  const submissionFunctions = {
    submitCode
  }

  return (
    <StateContext.Provider value={{
      states,
      authStates,
      editorStates,
      collabStates,
      submissionStates,
      submissionFunctions
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
