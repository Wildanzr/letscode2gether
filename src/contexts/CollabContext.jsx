import { createContext, useContext, useState } from 'react'
import { decode } from 'js-base64'
import axios from 'axios'

const CollabContext = createContext()

export const CollabProvider = ({ children }) => {
  // Collab State
  const [driver, setDriver] = useState('Wildanzr')
  const [navigator, setNavigator] = useState('Azmi')
  const [language, setLanguage] = useState(63)
  const [code, setCode] = useState('console.log("Hello world")')

  // Submission Functions
  const submission = async (mode, config) => {
    const options = {
      method: 'POST',
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      data: config
    }

    await axios.request(options).then(async (res) => {
      console.log(res.data)
      await checkStatus(res.data.token)
    }).catch(function (error) {
      console.error(error)
    })
  }

  const checkStatus = async (token) => {
    console.log('token', token)
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
      console.log('Start')

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
        console.log('stdin', decode(response.data.stdin))
        console.log('stdout', decode(response.data.stdout))
        return
      }
    } catch (err) {
      console.log('err', err)
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

  return (
    <CollabContext.Provider value={{ collabStates, collabFunctions }}>
      {children}
    </CollabContext.Provider>
  )
}

export const useCollab = () => useContext(CollabContext)
