import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ListOfProblem = (props) => {
  return (
    <table className="w-full table-auto shadow-xl">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
            NO
          </th>
          <th className="py-3 px-5 w-[45%] text-left overflow-clip whitespace-nowrap">
            NAME
          </th>
          <th className="py-3 px-5 w-[10%] text-right overflow-clip whitespace-nowrap">
            DIFFICULTY
          </th>
          <th className="py-3 px-5 w-[40%] text-center overflow-clip whitespace-nowrap">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        <tr
            className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
          >
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
                  <span className="text-gray-600">Hello World</span>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="text-gray-600">EASY</span>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex flex-row space-x-4 items-center justify-center">
                <Link
                 to={'problems/test?origin=detail'}
                 className="px-2 py-2 bg-easy rounded-lg"
                >
                  <BsEye className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                </Link>
              </div>
            </td>
          </tr>
      </tbody>
    </table>
  )
}

export default ListOfProblem
