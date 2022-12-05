import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { ProblemList, ProblemListLoading } from '../other'

import { Spin } from 'antd'
import Cookies from 'js-cookie'

const JourneyList = (props) => {
  // Destructure props
  const { journey } = props
  const { _id, name } = journey

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local states
  const [problems, setProblems] = useState(null)
  const [progress, setProgress] = useState(null)

  // Get all problems
  const getAllProblems = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/${_id}/problems`, config)
      // console.log(data)

      const { problems } = data.data
      setProblems(problems)
    } catch (error) {
      console.log(error)
    }
  }

  // Check progress
  const checkProgress = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/${_id}/progress`, config)
      // console.log(data)

      // Set Value
      setProgress(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get all problems
  useEffect(() => {
    if (user) {
      checkProgress()
    } else {
      setProgress({ solved: 0, total: 0 })
    }
    getAllProblems()
  }, [])

  return (
    <div className="flex w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row w-full h-full justify-between items-start">
        <div className="flex flex-col w-full h-full space-y-4">
          <p className="mb-0 text-xl font-ubuntu font-medium">
            {name}
          </p>

          <ul className="space-y-4">
            {problems
              ? (
                  problems.map((problem, index) => (
                  <ProblemList key={index} problem={problem} competeId={_id} />
                  ))
                )
              : <ProblemListLoading />
            }
          </ul>
        </div>

        <div className="flex flex-row lg:flex-col items-center text-xl space-x-4 lg:space-y-4">
          <p className="mb-0 text-left lg:text-center font-ubuntu font-medium">
            Your Progress:
          </p>
          <div className="mb-0 lg:text-4xl text-left lg:text-center text-success font-ubuntu font-medium">
            {progress === null
              ? <Spin size="small" />
              : `${progress.solved}/${progress.total}`
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyList
