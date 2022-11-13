import { useState } from 'react'

import { Link } from 'react-router-dom'
import { BsPencil, BsTrash } from 'react-icons/bs'

const EditableSampleCase = (props) => {
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
            const { name, widht, align } = heading
            return (
              <th
                key={index}
                className={`py-3 px-5 w-[${widht}%] ${align} overflow-clip whitespace-nowrap`}
              >
                {name}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light ">
        <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
          <td className="py-3 px-5 text-left overflow-clip">
            <div className="flex items-center justify-start">
              <div className="font-medium whitespace-nowrap">
                <span className="ml-3 text-gray-600">1</span>
              </div>
            </div>
          </td>
          <td className="py-3 px-5 text-left overflow-clip">
            <div className="flex items-center justify-start">
              <div className="font-medium whitespace-nowrap">
                <p className="mb-0 text-gray-600">123</p>
              </div>
            </div>
          </td>
          <td className="py-3 px-5 text-left overflow-clip">
            <div className="flex items-center justify-start">
              <div className="font-medium whitespace-nowrap">
                <span className="text-gray-600">123</span>
              </div>
            </div>
          </td>
          <td className="py-3 px-5 text-left overflow-clip">
            <div className="flex items-center justify-start">
              <div className="font-medium whitespace-nowrap">
                <span className="text-gray-600">EXPLANATION</span>
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
      </tbody>
    </table>
  )
}

export default EditableSampleCase
