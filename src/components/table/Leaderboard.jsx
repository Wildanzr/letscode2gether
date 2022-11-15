import React from 'react'

import Badge1 from '../../assets/badge1.svg'
import Badge5 from '../../assets/badge5.svg'
import Badge6 from '../../assets/badge6.svg'

const Leaderboard = () => {
  const person = [
    {
      name: 'John Doe',
      point: 1200,
      badge: [Badge1, Badge5, Badge6]
    },
    {
      name: 'Mary Jane',
      point: 1200,
      badge: [Badge1, Badge5, Badge6]
    },
    {
      name: 'Tony Stark',
      point: 1180,
      badge: [Badge1, Badge5, Badge6]
    },
    {
      name: 'Steve Rogers',
      point: 1000,
      badge: [Badge1, Badge5]
    },
    {
      name: 'Bruce Banner',
      point: 900,
      badge: [Badge1, Badge5]
    },
    {
      name: 'Thor Odinson',
      point: 800,
      badge: [Badge1]
    },
    {
      name: 'Natasha Romanoff',
      point: 700,
      badge: [Badge1]
    },
    {
      name: 'Clint Barton',
      point: 600,
      badge: [Badge1]
    },
    {
      name: 'Peter Parker',
      point: 500,
      badge: [Badge1]
    },
    {
      name: 'Wanda Maximoff',
      point: 400,
      badge: [Badge1]
    }
  ]
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-10 text-left overflow-clip whitespace-nowrap">
            RANK
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            NAME
          </th>
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            POINT
          </th>
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            BADGES
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light ">
        {person.map((item, index) => (
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
                  <span className="text-gray-600">{item.name}</span>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="text-gray-600">{item.point}</span>
                </div>
              </div>
            </td>
            <td className="py-1 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="flex flex-row space-x-2 whitespace-nowrap">
                  {item.badge.map((badge, index) => (
                    <img src={badge} key={index} className="w-10 h-10" />
                  ))}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Leaderboard
