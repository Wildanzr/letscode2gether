import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'

import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProblemList = (props) => {
  // Destructure props
  const { problem, competeId } = props
  const { problemId, _id } = problem
  const { title, difficulty } = problemId

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
      const { data } = await api.get(`/compete-problems/${_id}/check`, config)
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
    <>
      {problem
        ? (
        <li>
          <div className="flex flex-row font-ubuntu items-center">
            <div className="flex w-2/6 items-center justify-start">
              <p className="mb-0 text-sm">{title}</p>
            </div>
            <div className="flex w-2/6 justify-center lg:justify-start items-center">
              <p className={`mb-0 text-sm ${difficulty === 1 ? 'text-success' : difficulty === 2 ? 'text-medium' : 'text-hard'}`}>
                {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'}
              </p>
            </div>
            <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
              <Link
                to={`path/${competeId}/problems/${_id}`}
                className={`w-4/6 py-2 ${isDone === null ? 'bg-snow' : isDone === 0 ? 'bg-snow' : isDone === 1 ? 'bg-medium' : 'bg-success'} text-main text-center rounded font-medium lg:font-bold hover:text-main hover:dark:text-main`}
                >
                {isDone === null
                  ? <Spin size="small" />
                  : isDone === 0
                    ? 'Solve Now'
                    : isDone === 1
                      ? 'Try Again'
                      : 'Solved'
                }
              </Link>
            </div>
          </div>
        </li>
          )
        : null
        }
    </>
  )
}

export default ProblemList

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">Hello World</p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-success">easy</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-snow text-main rounded font-medium lg:font-bold">
//         Solved
//       </button>
//     </div>
//   </div>
// </li>

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">
//         Apakah Ini Belum Terlalu Panjang
//       </p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-medium">medium</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-medium text-main rounded font-medium lg:font-bold">
//         Try Again
//       </button>
//     </div>
//   </div>
// </li>

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">Introduce Myself</p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-hard">hard</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-success text-snow rounded font-medium lg:font-bold">
//         Lets Solve
//       </button>
//     </div>
//   </div>
// </li>
