import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { BsEye, BsPencil, BsTrash, BsPlus } from 'react-icons/bs'

const ListOfCompete = (props) => {
  const { journeys, setFetch, competes } = props

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
      wide: 75,
      align: 'text-left'
    },
    {
      name: 'TOTAL PROBLEM',
      wide: 10,
      align: 'text-center'
    },
    {
      name: 'ACTIONS',
      wide: 10,
      align: 'text-center'
    }
  ])

  // Delete journey
  const deleteJourney = async (journeyId) => {
    // Show loading
    mySwal.fire({
      title: 'Creating Problem...',
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.delete(`/competes/${journeyId}`, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: competes ? 'Compete has been deleted' : 'Journey has been deleted',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => setFetch(true))
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

  // Dialog delete journey
  const dialogDeleteJourney = (journeyId) => {
    mySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You will not be able to recover this learning journey!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJourney(journeyId)
      }
    })
  }

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
      <tbody className="text-black text-xs font-light ">
        {journeys === null
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
              <div className="flex flex-row space-x-4 items-center justify-center">
                <Spin size="small" />
              </div>
            </td>
          </tr>
            )
          : (
              journeys.length === 0
                ? (
                  <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
                    <td colSpan={5} className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-center">
                        <div className="font-medium whitespace-nowrap">
                          <span className="ml-3 text-gray-600">No Journeys Found</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  )
                : journeys.map((journey, index) => {
                  const { _id, name, problems } = journey
                  return (
                <tr
                  key={index}
                  className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
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
                        <span className="text-gray-600">{name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-center">
                      <div className="font-medium whitespace-nowrap">
                        <span className="text-gray-600">
                          {problems.length}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex flex-row space-x-4 items-center justify-center">
                      <Link
                        to={`${_id}`}
                        className="px-2 py-2 bg-easy rounded-lg"
                      >
                        <BsEye className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                      </Link>

                      <Link
                        to={`${_id}/edit`}
                        className="px-2 py-2 bg-medium rounded-lg"
                      >
                        <BsPencil className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                      </Link>

                      <div className="px-2 py-2 bg-hard rounded-lg cursor-pointer" onClick={() => dialogDeleteJourney(_id)}>
                        <BsTrash className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                      </div>
                    </div>
                  </td>
                </tr>
                  )
                })
            )}
      </tbody>
      <tfoot>
        {/* Button for add more learning journey */}
        <tr>
          <td
            colSpan="4"
            className="bg-easy hover:bg-blue-600 duration-300 ease-in-out"
          >
            <div className="py-2 flex flex-row items-center justify-center">
              <Link
                to="/teacher/manage/competes/create"
                className="flex flex-row space-x-2 w-full items-center justify-center"
              >
                <BsPlus className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                <span className="text-base font-medium text-snow whitespace-nowrap">
                  Add More Competes
                </span>
              </Link>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ListOfCompete
