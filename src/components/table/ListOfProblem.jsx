import { useState, useEffect } from 'react'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin, Tag } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { BsEye } from 'react-icons/bs'

const ListOfProblem = (props) => {
  // useParams
  const { journeyId } = useParams()

  // Local states
  const [headingList] = useState([
    {
      name: 'NO',
      wide: 5,
      align: 'text-left'
    },
    {
      name: 'NAME',
      wide: 65,
      align: 'text-left'
    },
    {
      name: 'MAX POINT',
      wide: 10,
      align: 'text-center'
    },
    {
      name: 'DIFFICULTY',
      wide: 10,
      align: 'text-center'
    },
    {
      name: 'ACTIONS',
      wide: 10,
      align: 'text-right'
    }
  ])
  const [problems, setProblems] = useState(null)

  // Get compete problems
  const getCompeteProblems = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${journeyId}/problems`, config)
      // console.log(data.data.problems)
      setProblems(data.data.problems)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get compete problems
  useEffect(() => {
    getCompeteProblems()
  }, [])
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          {headingList.map((heading, index) => (
            <th
              key={index}
              className={`py-3 px-5 w-[${heading.wide}%] ${heading.align} overflow-clip whitespace-nowrap`}
            >
              {heading.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        {problems
          ? (
              problems.length > 0
                ? (
                    problems.map((problem, index) => {
                      const { maxPoint, problemId } = problem
                      const { _id, title, difficulty } = problemId
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-200 bg-gray-100 hover:bg-white"
                        >
                          <td className="py-3 px-5 text-left overflow-clip">
                            <div className="flex items-center justify-start">
                              <div className="font-medium whitespace-nowrap">
                                <span className="ml-3 text-gray-600">{index + 1}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-left overflow-clip">
                            <div className="flex items-center justify-start">
                              <div className="font-medium whitespace-nowrap">
                                <span className="text-gray-600">{title}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-left overflow-clip">
                            <div className="flex items-center justify-center">
                              <div className="font-medium whitespace-nowrap">
                                <span className="text-gray-600">{maxPoint}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-left overflow-clip">
                            <div className="flex items-center justify-center">
                              <div className="font-medium whitespace-nowrap">
                              {difficulty === 1 && (
                                <Tag color="#16A34A">Easy</Tag>
                              )}
                              {difficulty === 2 && (
                                <Tag color="#EAB308">Medium</Tag>
                              )}
                              {difficulty === 3 && (
                                <Tag color="#DC2626">Hard</Tag>
                              )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-left overflow-clip">
                            <div className="flex flex-row space-x-4 items-center justify-end">
                              <Link
                                to={`problems/${_id}?origin=detail`}
                                className="px-2 py-2 bg-easy rounded-lg"
                              >
                                <BsEye className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )
                : (
                  <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
                    <td colSpan={5} className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-center">
                        <div className="font-medium whitespace-nowrap">
                          There is no problems in this journey
                        </div>
                      </div>
                    </td>
                  </tr>
                  )
            )
          : (
          <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small'/>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small'/>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small'/>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small'/>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex flex-row space-x-4 items-center justify-end">
                <Spin size='small'/>
              </div>
            </td>
          </tr>
            )}
      </tbody>
    </table>
  )
}

export default ListOfProblem
