import { useState } from 'react'

import Result from './Result'

import axios from 'axios'

const Testcase = (props) => {
  // Props destructuring
  const { token } = props

  // Local States
  const [result, setResult] = useState({
    statusId: 2,
    data: {
      stdin: undefined,
      expected_output: undefined,
      stdout: undefined,
      status: {
        statusId: undefined,
        description: undefined
      },
      time: undefined,
      memory: undefined,
      statusId: undefined
    }
  })
  const [once, setOnce] = useState(false)

  // Check token
  const checkToken = async (token) => {
    // console.log('Checking token...')
    let tempRes = {
      statusId: 1,
      data: null
    }

    while (tempRes.statusId === 1 || tempRes.statusId === 2) {
      const res = await getSubmission(token)
      // console.log(res)
      tempRes = res
    }

    setResult(tempRes)
  }

  // Get Submission Result
  const getSubmission = async (token) => {
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_RAPID_API_URL + '/' + token,
      params: {
        base64_encoded: 'true',
        fields: 'compile_output,expected_output,language,memory,status,stderr,stdin,stdout,time'
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

  // Call checkToken once only without useEffect
  if (!once) {
    checkToken(token)
    setOnce(true)
  }

  return (
    <Result result={result} />
  )
}

export default Testcase
