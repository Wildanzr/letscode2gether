import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { Spin, message } from 'antd'
import SubmissionList from './SubmissionList'

const Submission = () => {
  // useParams
  const { competeProblemId } = useParams()

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [submissions, setSubmissions] = useState(null)

  // Get submissions
  const getSubmissions = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const { data } = await api.get(`/compete-problems/${competeProblemId}/submissions`, config)
      const { listOfSubmission } = data.data
      // console.log(data)

      // Set Value
      setSubmissions(listOfSubmission)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get submissions
  useEffect(() => {
    // Check if user is authenticated
    if (user) {
      getSubmissions()
    } else {
      setSubmissions([])

      // Show info message in 5 seconds
      message.info(langConfig.infoMustLogin, 5)
    }
  }, [user])
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex flex-col w-full items-center justify-center">
        {submissions === null
          ? <Spin size="default" />
          : submissions.length === 0
            ? <p className="mb-0 text-base tracking-wide text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.submissionEmpty}
            </p>
            : <SubmissionList submissions={submissions} />
        }
      </div>
    </div>
  )
}

export default Submission
