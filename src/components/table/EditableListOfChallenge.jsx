import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { BsEye, BsPencil, BsTrash, BsPlus } from 'react-icons/bs'

const EditableListOfChallenge = (props) => {
  const { problems, cpId, setFetch } = props

  // Global functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

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

  // Delete problem
  const deleteProblem = async (problemId) => {
    // Show loading
    mySwal.fire({
      title: 'Deleting Problem...',
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => mySwal.showLoading()
    })

    // Configuration
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.delete(`/competes/${cpId}/problems/${problemId}`, config)
      setFetch(true)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Delete challenge success',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: error.response.data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false
      })
    }
  }

  // Dialog delete problem
  const dialogDeleteProblem = (problemId) => {
    mySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You will not be able to recover this problem!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProblem(problemId)
      }
    })
  }

  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          {headingList.map((heading, index) => (
            <th key={index} className={`py-3 px-5 w-[${heading.wide}%] ${heading.align} overflow-clip whitespace-nowrap`}>
              {heading.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        {problems === null
          ? (
          <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size="small" />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size="small" />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size="small" />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size="small" />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex flex-row space-x-4 items-center justify-center">
                <Spin size="small" />
              </div>
            </td>
          </tr>
            )
          : problems.length === 0
            ? (
              <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
                    <td colSpan={5} className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-center">
                        <div className="font-medium whitespace-nowrap">
                          <span className="text-gray-600">No Challenges Found</span>
                        </div>
                      </div>
                    </td>
                  </tr>
              )
            : problems.map((problem, index) => {
              const { _id: competeId, problemId, maxPoint } = problem
              const { _id, title, difficulty } = problemId || {}
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
                    to={`/admin/manage/challenges/${cpId}/problems/${_id}?origin=edit`}
                    className="px-2 py-2 bg-easy rounded-lg"
                  >
                    <BsEye className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </Link>

                  <Link
                    to={`/admin/manage/challenges/${cpId}/problems/${_id}/edit`}
                    className="px-2 py-2 bg-medium rounded-lg"
                  >
                    <BsPencil className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </Link>

                  <div
                    onClick={() => dialogDeleteProblem(competeId)}
                    className="px-2 py-2 bg-hard rounded-lg cursor-pointer"
                  >
                    <BsTrash className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </div>
                </div>
              </td>
            </tr>
              )
            })
          }
      </tbody>
      <tfoot>
        {/* Button for add more learning journey */}
        <tr>
          <td
            colSpan={5}
            className="bg-easy hover:bg-blue-600 duration-300 ease-in-out"
          >
            <div className="py-2 flex flex-row items-center justify-center">
              <Link
                to={`/admin/manage/challenges/create?cpId=${cpId}`}
                className="flex flex-row space-x-2 w-full items-center justify-center"
              >
                {problems === null
                  ? <Spin size="small" />
                  : (
                    <>
                      <BsPlus className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                      <span className="text-base font-medium text-snow whitespace-nowrap">
                        {problems.length === 0
                          ? 'Add Challenge'
                          : 'Add More Challenge'
                        }
                      </span>
                    </>
                    )
                }
              </Link>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default EditableListOfChallenge
