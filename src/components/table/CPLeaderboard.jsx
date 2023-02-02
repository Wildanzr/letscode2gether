import React from 'react'

import { Link } from 'react-router-dom'

const CPLeaderboard = (props) => {
  // Destrcuturing props
  const { data } = props
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-easy dark:bg-floor duration-300 ease-in-out text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-10 text-left overflow-clip whitespace-nowrap">
            RANK
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            NAME
          </th>
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            POINT
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-base font-light ">
        {data.map((person, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 bg-gray-100 hover:bg-white"
          >
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <span className="ml-3 text-main">
                  {index + 1 === 1
                    ? '🥇'
                    : index + 1 === 2
                      ? '🥈'
                      : index + 1 === 3
                        ? '🥉'
                        : index + 1
                    }
                  </span>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
              <div className="font-medium whitespace-nowrap">
                  <Link
                    to={`/profile/${person.username}`}
                    className="flex flex-row group space-x-2 items-center group"
                  >
                    <div className="flex h-8 w-8 rounded-full group-hover:border-easy">
                      <img
                        src={person.userId.avatar}
                        className="rounded-full object-cover object-center"
                      />
                    </div>
                    <span className="text-main group-hover:text-easy group-hover:cursor-pointer">
                      {person.userId.username}
                    </span>
                  </Link>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="text-main">{person.currentPoints}</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CPLeaderboard
