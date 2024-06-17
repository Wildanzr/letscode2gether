import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import Cookies from 'js-cookie'

import api from '../../api'

const MaterialList = (props) => {
  const { material } = props
  const { _id, title } = material

  const [isDone, setIsDone] = useState(null)

  // Check if user already participant
  const checkIsDone = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/materials/${_id}/check`, config)
      // console.log(data)
      const { isDone } = data.data
      setIsDone(isDone)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIsDone()
  }, [])

  return (
    <div className={`flex w-full px-5 py-3 rounded-lg border-2 lg:border-4 ${!isDone ? 'border-easy' : 'border-success'} bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out`}>
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row w-full h-full justify-between items-start">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between w-full h-full">
          <p className="mb-0 text-xl font-ubuntu font-medium">
            {title}
          </p>

          <Link
            to={`/materials/learn/${_id}`}
            className={`w-40 py-2 ${
              isDone === null
                ? 'bg-snow'
                : isDone === false
                ? 'bg-easy text-snow hover:text-snow hover:dark:text-snow'
                : 'bg-success text-main hover:text-main hover:dark:text-main'
            }  text-center rounded font-medium lg:font-bold`}
          >
            {isDone === null
              ? (
              <Spin size="small" />
                )
              : isDone === false
                ? langConfig.journeyListProblemButton1
                : langConfig.journeyListProblemButton3}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MaterialList
