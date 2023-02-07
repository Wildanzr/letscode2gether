import { useState, useEffect } from 'react'
import langConfig from '../../config/langConfig.json'

import { Tag, Spin, message } from 'antd'

import axios from 'axios'
import { BsCheckCircle, BsXCircle, BsQuestionCircleFill } from 'react-icons/bs'

const TestCase = (props) => {
  const { token, title } = props

  // Local States
  const [result, setResult] = useState(null)
  const [tokenInvalid, setTokenInvalid] = useState(false)

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
      setResult(false)
      setTokenInvalid(true)
      return {
        statusId: 13,
        data: null
      }
    }
  }

  // Check token
  const checkToken = async (token) => {
    // console.log('Checking token...')
    let tempRes = {
      statusId: 1,
      data: null
    }

    while (tempRes.statusId === 1 || tempRes.statusId === 2) {
      // wait for 800ms
      await new Promise((resolve) => setTimeout(resolve, 800))
      const res = await getSubmission(token)
      // console.log(res)
      tempRes = res
    }

    // Set value
    if (tempRes.data !== null) {
      if (tempRes.statusId === 3 || tempRes.data.status.id === 3) setResult(true)
    } else setResult(false)
  }

  // Initially check token
  useEffect(() => {
    checkToken(token)
  }, [])
  return (
    <Tag color={`${result === null
      ? '#FFFFFF'
      : result === true
        ? '#16A34A'
        : tokenInvalid === true
          ? '#8D9F8D'
          : '#DC2626'
    }`}>
      <div className="flex flex-row gap-2 py-2 items-center justify-center">
        <span className={`font-medium tracking-wide text-sm ${result === null ? 'text-black' : 'text-white'} duration-150 ease-in-out`}>{title}</span>
        {result === null
          ? <Spin size="small" />
          : result === true
            ? <BsCheckCircle className={`w-5 h-5 duration-150 ease-in-out ${result === null ? 'fill-black' : 'fill-white'}`} />
            : tokenInvalid === true
              ? <BsQuestionCircleFill onClick={() => message.info(langConfig.sideContentSubmissionsInfo)} className={`cursor-pointer w-5 h-5 duration-150 ease-in-out ${result === null ? 'fill-black' : 'fill-white'}`} />
              : <BsXCircle className={`w-5 h-5 duration-150 ease-in-out ${result === null ? 'fill-black' : 'fill-white'}`} />
          }
      </div>
    </Tag>
  )
}

export default TestCase
