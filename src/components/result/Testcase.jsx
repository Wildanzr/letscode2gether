/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import Result from './Result'
import { Skeleton } from 'antd'

import axios from 'axios'

const Testcase = (props) => {
  // Props destructuring
  const { token } = props

  // Local States
  const [result, setResult] = useState({
    statusId: 1,
    data: null
  })
  const [once, setOnce] = useState(false)

  // Check token
  const checkToken = async (token) => {
    console.log('Checking token...')
    while (result.statusId === 1 || result.satatusId === 2) {
      const res = await getSubmission(token)

      setResult(res)
      sleep(1000)
    }
  }

  // Get Submission Result
  const getSubmission = async (token) => {
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_RAPID_API_URL + '/' + token,
      params: {
        base64_encoded: 'true',
        fields: 'expected_output,language,memory,status,stderr,stdin,stdout,time'
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

  // Custom sleep function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  // // Get submission result
  // useEffect(() => {
  //   checkToken(token)
  // }, [])

  // Call checkToken once only without useEffect
  if (!once) {
    checkToken(token)
    setOnce(true)
  }

  return (
    <>
      {
        result.data === null
          ? (<Skeleton />)
          : (<Result result={result} />)
      }
    </>
  )
}

export default Testcase
