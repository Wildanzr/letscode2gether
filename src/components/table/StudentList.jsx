import langConfig from '../../config/langConfig.json'
import { useState } from 'react'

import { LearningProgress } from '../other'

import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import B1 from '../../assets/badge1.svg'
import B2 from '../../assets/badge2.svg'
import B3 from '../../assets/badge3.svg'
import B4 from '../../assets/badge4.svg'
import B5 from '../../assets/badge5.svg'
import B6 from '../../assets/badge6.svg'

const StudentList = (props) => {
  // Props destructure
  const { students, start } = props

  // Local states
  const [headingList] = useState([
    {
      name: langConfig.tableStudent1,
      wide: 5,
      align: 'text-center'
    },
    {
      name: langConfig.tableStudent2,
      wide: 30,
      align: 'text-left'
    },
    {
      name: langConfig.tableStudent3,
      wide: 25,
      align: 'text-center'
    },
    {
      name: langConfig.tableStudent4,
      wide: 10,
      align: 'text-center'
    },
    {
      name: langConfig.tableStudent5,
      wide: 10,
      align: 'text-center'
    },
    {
      name: langConfig.tableStudent6,
      wide: 20,
      align: 'text-center'
    }
  ])

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
      <tbody className="text-black font-light text-base">
        {students === null
          ? <LoadingStudents />
          : students.length === 0
            ? <ZeroStudents />
            : students.map((student, index) => (
                <tr key={index} className="border-b border-gray-200 bg-gray-100 hover:bg-white">
                  {/* Number */}
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-center">
                      <div className="font-medium whitespace-nowrap">
                        <span className="text-main">{start + index + 1}</span>
                      </div>
                    </div>
                  </td>

                  {/* Fullname */}
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-start">
                    <div className="font-medium whitespace-nowrap">
                        <Link
                          to={`/profile/${student.username}`}
                          className="flex flex-row group space-x-2 items-center group"
                        >
                          <div className="flex h-8 w-8 rounded-full group-hover:border-easy">
                            <img
                              src={student.avatar}
                              className="rounded-full object-cover object-center"
                            />
                          </div>
                          <span className="text-main group-hover:text-easy group-hover:cursor-pointer">
                            {student.fullName}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-center">
                      <div className="font-medium whitespace-nowrap">
                        <span className="text-main">{student.username}</span>
                      </div>
                    </div>
                  </td>

                  {/* Badge */}
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-center">
                      <div className="font-medium whitespace-nowrap">
                        {defineBadge(student.point)}
                      </div>
                    </div>
                  </td>

                  {/* Point */}
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-center">
                      <div className="font-medium whitespace-nowrap">
                        <span className="text-main">{student.point}</span>
                      </div>
                    </div>
                  </td>

                  {/* Learning Progress */}
                  <LearningProgress studentId={student._id}/>
                </tr>
            ))
        }
      </tbody>
    </table>
  )
}

const ZeroStudents = () => {
  return (
    <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
      <td colSpan={6} className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-center">
          <div className="font-medium whitespace-nowrap">
            <span className="ml-3 text-gray-600">
              {langConfig.infoZeroStudents}
            </span>
          </div>
        </div>
      </td>
    </tr>
  )
}

const LoadingStudents = () => {
  return (
    <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
      <td colSpan={6} className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-center">
          <div className="font-medium whitespace-nowrap">
            <Spin size="small" />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default StudentList
