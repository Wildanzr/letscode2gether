import langConfig from '../../config/langConfig.json'

import B1 from '../../assets/badge1.svg'
import B2 from '../../assets/badge2.svg'
import B3 from '../../assets/badge3.svg'
import B4 from '../../assets/badge4.svg'
import B5 from '../../assets/badge5.svg'
import B6 from '../../assets/badge6.svg'

import { Link } from 'react-router-dom'

const Leaderboard = (props) => {
  // Destructure props
  const { leaderboard } = props

  // Define badge
  const defineBadge = (point) => {
    if (point === 0) {
      return <p className='mb-0 text-2xl font-ubuntu font-bold text-success'>-</p>
    } else if (point < 500) {
      return <img src={B1} className="w-10 h-10" />
    } else if (point < 1000) {
      return <img src={B2} className="w-10 h-10" />
    } else if (point < 1500) {
      return <img src={B3} className="w-10 h-10" />
    } else if (point < 2000) {
      return <img src={B4} className="w-10 h-10" />
    } else if (point < 2500) {
      return <img src={B5} className="w-10 h-10" />
    } else {
      return <img src={B6} className="w-10 h-10" />
    }
  }

  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-easy dark:bg-floor duration-300 ease-in-out text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-10 text-left overflow-clip whitespace-nowrap">
            {langConfig.leaderboardRank}
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            {langConfig.leaderboardName}
          </th>
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            {langConfig.leaderboardPoint}
          </th>
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            {langConfig.leaderboardBadge}
          </th>
        </tr>
      </thead>
      <tbody className="text-black font-light text-base ">
        {leaderboard.map((person, index) => (
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
                        src={person.avatar}
                        className="rounded-full object-cover object-center"
                      />
                    </div>
                    <span className="text-main group-hover:text-easy group-hover:cursor-pointer">
                      {person.username}
                    </span>
                  </Link>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="text-main">{person.point}</span>
                </div>
              </div>
            </td>
            <td className="py-1 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="flex flex-row space-x-2 whitespace-nowrap">
                  {defineBadge(person.point)}
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
