import { useState } from 'react'

import { Link } from 'react-router-dom'
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs'

const EditableSampleCase = (props) => {
  // Destructure props
  const { sampleCases } = props

  // Local States
  const [headingList] = useState([
    {
      name: 'NO',
      wide: 5,
      align: 'text-left'
    },
    {
      name: 'INPUT',
      wide: 15,
      align: 'text-left'
    },
    {
      name: 'OUTPUT',
      wide: 15,
      align: 'text-left'
    },
    {
      name: 'EXPLANATION',
      wide: 45,
      align: 'text-left'
    },
    {
      name: 'ACTIONS',
      wide: 20,
      align: 'text-center'
    }
  ])
  return (
    <table className="w-full table-auto shadow-xl">
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

      <tbody className="text-black text-xs font-light ">
        {sampleCases.map((sample, index) => {
          const { input, output, explanation } = sample

          // split input with \n
          const inputSplit = input.split('\n')
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
                    {inputSplit.map((input, index) => (
                      <p key={index} className="mb-0 text-gray-600">
                        {input}
                      </p>
                    ))}
                  </div>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <div className="font-medium whitespace-nowrap">
                    <span className="text-gray-600">{output}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <div className="font-medium whitespace-nowrap">
                    <span className="text-gray-600">{explanation}</span>
                  </div>
                </div>
              </td>

              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <Link
                    to={'problems/edit'}
                    className="px-2 py-2 bg-medium rounded-lg"
                  >
                    <BsPencil className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </Link>

                  <div
                    onClick={() => console.log('delete')}
                    className="px-2 py-2 bg-hard rounded-lg cursor-pointer"
                  >
                    <BsTrash className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </div>
                </div>
              </td>
            </tr>
          )
        })}
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
                to={'create'}
                className="flex flex-row space-x-2 w-full items-center justify-center"
              >
                <BsPlus className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                <span className="text-base font-medium text-snow whitespace-nowrap">
                  Add More Sample Case
                </span>
              </Link>
            </div>
          </td>
        </tr>
      </tfoot>

    </table>
  )
}

export default EditableSampleCase
