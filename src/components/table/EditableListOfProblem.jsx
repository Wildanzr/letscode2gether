import { BsEye, BsPencil, BsTrash, BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const EditableListOfProblem = (props) => {
  const { problems } = props

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
        {problems.map((problem, index) => {
          const { _id, name, difficulty } = problem
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
                    {difficulty === 1 && (
                      <span className="text-gray-600">EASY</span>
                    )}
                    {difficulty === 2 && (
                      <span className="text-gray-600">MEDIUM</span>
                    )}
                    {difficulty === 3 && (
                      <span className="text-gray-600">HARD</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <Link
                    to={`problems/${_id}`}
                    className="px-2 py-2 bg-easy rounded-lg"
                  >
                    <BsEye className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                  </Link>

                  <Link
                    to={`problems/${_id}/edit`}
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
        {/* Button for add more learning journey */}
        <tr>
          <td
            colSpan="4"
            className="bg-easy hover:bg-blue-600 duration-300 ease-in-out"
          >
            <div className="py-2 flex flex-row items-center justify-center">
              <Link
                to={'create'}
                className="flex flex-row space-x-2 w-full items-center justify-center"
              >
                <BsPlus className="w-6 h-6 fill-snow hover:fill-main duration-300 ease-in-out" />
                <span className="text-base font-medium text-snow whitespace-nowrap">
                  Add More Problem
                </span>
              </Link>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default EditableListOfProblem
