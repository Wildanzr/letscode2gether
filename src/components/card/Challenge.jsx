import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'

import { Spin } from 'antd'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Challenge = (props) => {
  // Destructure props
  const { title, difficulty, maxPoint, competeId, competeProblemId, disabled } =
    props

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local states
  const [isDone, setIsDone] = useState(null)

  // Check cp is done
  const checkCPIsDone = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/compete-problems/${competeProblemId}/check`,
        config
      )
      const { isDone } = data.data
      // console.log(data)

      // Set Value
      setIsDone(isDone)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially check cp is done
  useEffect(() => {
    if (user) {
      checkCPIsDone()
    } else {
      setIsDone(0)
    }
  }, [])
  return (
    <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
      <div className="flex w-4/6 flex-col space-y-3">
        <p className="mb-0 font-ubuntu tracking-wide text-base font-bold">{title}</p>
        <div className="flex flex-col lg:flex-row w-full lg:space-x-5 items-start lg:items-center">
          <p className="mb-0 text-xs lg:text-sm font-ubuntu font-medium">
            {langConfig.challengeLevelLabel}
            <span
              className={`pl-2 mb-0 text-sm font-ubuntu font-medium ${
                difficulty === 1
                  ? 'text-success'
                  : difficulty === 2
                  ? 'text-medium'
                  : 'text-hard'
              }`}
            >
              {difficulty === 1 ? langConfig.challengeLevel1 : difficulty === 2 ? langConfig.challengeLevel2 : langConfig.challengeLevel3}
            </span>
          </p>

          <p className="mb-0 text-xs lg:text-sm font-ubuntu font-medium">
            {langConfig.challengMaxPointLabel}
            <span className="pl-2 mb-0 text-sm font-ubuntu font-medium text-easy">
              {maxPoint}
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-2/6 items-start justify-end">
        {disabled
          ? (
          <buttton
            disabled
            className={`w-full lg:w-2/3 py-2 ${
              isDone === null
                ? 'bg-snow'
                : isDone === 0
                ? 'bg-snow'
                : isDone === 1
                ? 'bg-medium'
                : 'bg-success'
            } text-main text-center rounded font-medium lg:font-bold cursor-not-allowed`}
          >
            {langConfig.competeProblemLocked}
          </buttton>
            )
          : (
          <Link
            to={`path/${competeId}/problems/${competeProblemId}`}
            className={`w-full lg:w-2/3 py-2 ${
              isDone === null
                ? 'bg-snow'
                : isDone === 0
                ? 'bg-easy text-snow hover:text-snow hover:dark:text-snow'
                : isDone === 1
                ? 'bg-medium text-main hover:text-main hover:dark:text-main'
                : 'bg-success text-main hover:text-main hover:dark:text-main'
            }  text-center rounded font-medium lg:font-bold`}
          >
            {isDone === null
              ? (
              <Spin size="small" />
                )
              : isDone === 0
                ? (
                    langConfig.journeyListProblemButton1
                  )
                : isDone === 1
                  ? (
                      langConfig.journeyListProblemButton2
                    )
                  : (
                      langConfig.journeyListProblemButton3
                    )}
          </Link>
            )}
      </div>
    </div>
  )
}

export default Challenge
