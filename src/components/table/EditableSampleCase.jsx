import langConfig from '../../config/langConfig.json'
import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Skeleton } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs'

const EditableSampleCase = (props) => {
  // Destructure props
  const { sampleCases, setFetch, competes } = props

  // useParams
  const { journeyId, problemId, competeId, challengeId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [headingList] = useState([
    {
      name: langConfig.tableSampleDetail1,
      wide: 5,
      align: 'text-left'
    },
    {
      name: langConfig.tableSampleDetail2,
      wide: 15,
      align: 'text-left'
    },
    {
      name: langConfig.tableSampleDetail3,
      wide: 15,
      align: 'text-left'
    },
    {
      name: langConfig.tableSampleDetail4,
      wide: 45,
      align: 'text-left'
    },
    {
      name: langConfig.tableSampleDetail5,
      wide: 20,
      align: 'text-right'
    }
  ])

  // Delete sample case
  const deleteSampleCase = async (sampleId) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingDeleteSampleCase,
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    // Delete Sample Case
    try {
      const path = journeyId === undefined
        ? `/problems/${challengeId}/sample-cases/${sampleId}`
        : `/problems/${problemId}/sample-cases/${sampleId}`

      await api.delete(path, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successDeleteSampleCase,
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

  // Dialog for delete sample case
  const dialogDeleteSampleCase = (sampleId) => {
    mySwal.fire({
      icon: 'warning',
      title: langConfig.dialogDeleteSampleCase,
      text: langConfig.infoDeleteSampleCase,
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Batal',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSampleCase(sampleId)
      }
    })
  }

  const formatOutput = (str) => {
    if (str === null) return null
    const formatted = str.replace(/\^/g, '\n')

    return (
      <>
        {formatted.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </>
    )
  }

  return (
    <>
      {sampleCases
        ? (
        <table className="w-full table-auto shadow-md">
          <thead>
            <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
              {headingList.map((heading, index) => {
                const { name, wide, align } = heading
                return (
                  <th
                    key={index}
                    className={`py-3 px-5 w-[${wide}%] ${align} overflow-clip whitespace-nowrap`}
                  >
                    {name}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="text-black text-xs font-light font-code">
            {/* Output sample cases based on length */}
            {sampleCases.length > 0
              ? (
                  sampleCases.map((sample, index) => {
                    const { _id, input, output, explanation } = sample

                    // split input with \n
                    const inputSplit = input ? input.split('\n') : input
                    const outputSplit = output.split('\n')
                    return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 bg-gray-100 hover:bg-white"
                  >
                    <td className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-start">
                        <div className="font-medium whitespace-nowrap">
                          <span className="ml-3 text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-start">
                        <div className="font-medium whitespace-nowrap">
                          {inputSplit
                            ? inputSplit.map((input, index) => (
                              <p key={index} className="mb-0 text-gray-600">
                                {input}
                              </p>
                            ))
                            : <p className="mb-0 text-gray-300">{langConfig.infoNoInput}</p>
                          }
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-start">
                        <div className="font-medium whitespace-nowrap">
                          {outputSplit.map((output, index) => (
                            <p key={index} className="mb-0 text-gray-600">
                              {output}
                            </p>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                      <div className="flex items-center justify-start">
                        <div className="font-medium">
                          <span className="text-gray-600">{formatOutput(explanation)}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-5 text-left overflow-clip">
                      <div className="flex flex-row space-x-4 items-center justify-end">
                        <Link
                          to={journeyId === undefined
                            ? `/admin/manage/challenges/${competeId}/problems/${challengeId}/samplecases/${_id}/edit`
                            : competes
                              ? `/teacher/manage/competes/${journeyId}/problems/${problemId}/samplecases/${_id}/edit`
                              : `/admin/manage/journeys/${journeyId}/problems/${problemId}/samplecases/${_id}/edit`
                          }
                          className="px-2 py-2 bg-medium rounded-lg"
                        >
                          <BsPencil className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                        </Link>

                        <div
                          onClick={() => dialogDeleteSampleCase(_id)}
                          className="px-2 py-2 bg-hard rounded-lg cursor-pointer"
                        >
                          <BsTrash className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                        </div>
                      </div>
                    </td>
                  </tr>
                    )
                  })
                )
              : (
                <tr
                  className="border-b border-gray-200 bg-gray-100 hover:bg-white"
                >
                <td colSpan={5} className="py-3 px-5 text-left overflow-clip">
                  <div className="flex items-center justify-center">
                    <div className="font-medium whitespace-nowrap">
                      <span className="ml-3 text-gray-600">
                        {langConfig.infoZeroSampleCase}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
                )}
          </tbody>

          <tfoot>
            {/* Button for add more sample case */}
            <tr>
              <td
                colSpan="5"
                className="bg-easy hover:bg-blue-600 duration-300 ease-in-out"
              >
                <div className="py-2 flex flex-row items-center justify-center">
                  <Link
                    to={journeyId === undefined
                      ? `/admin/manage/challenges/${competeId}/problems/${challengeId}/samplecases/create`
                      : competes
                        ? `/teacher/manage/competes/${journeyId}/problems/${problemId}/samplecases/create`
                        : `/admin/manage/journeys/${journeyId}/problems/${problemId}/samplecases/create`
                    }
                    className="flex flex-row space-x-2 w-full items-center justify-center"
                  >
                    <BsPlus className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                    <span className="text-base font-medium text-snow whitespace-nowrap">
                      {langConfig.tableAddSample}
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
          )
        : (
        <Skeleton active paragraph={{ rows: 5 }} />
          )}
    </>
  )
}

export default EditableSampleCase
