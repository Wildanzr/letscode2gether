import langConfig from '../config/langConfig.json'
import { useState, useEffect } from 'react'

import { StatDetail } from '../components/card'
import api from '../api'

import Cookies from 'js-cookie'
import { Spin } from 'antd'

const Statistics = (props) => {
  // Local states
  const [statistic, setStatistic] = useState(null)

  // Get dashboard statistic
  const getDashboardStatistic = async () => {
    // config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get('/competes/statistics', config)
      // console.log(data)

      // Destructure
      const { totalCompetes, totalProblems, totalStudent, totalSubmissions, totalTeacher } = data.data

      // Set Value
      setStatistic({
        totalCompetes,
        totalProblems,
        totalStudent,
        totalSubmissions,
        totalTeacher
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get dashboard data
  useEffect(() => {
    getDashboardStatistic()
  }, [])
  return (
    <div className="flex flex-col w-full">
      <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>
        {langConfig.dashboardStatistics}
      </h3>
      <div className="flex w-full py-4 overflow-y-auto">
        <div className="flex flex-row w-full space-x-5">
            <StatDetail icon={1}
              title={langConfig.totalStudents}
              value={statistic === null ? <Spin size='small' /> : statistic.totalStudent }
              />
            <StatDetail icon={1}
              title={langConfig.totalTeachers}
              value={statistic === null ? <Spin size='small' /> : statistic.totalTeacher}
              />
            <StatDetail icon={2}
              title={langConfig.totalProblems}
              value={statistic === null ? <Spin size='small' /> : statistic.totalProblems}
              />
            <StatDetail icon={3}
              title={langConfig.totalSubmissions}
              value={statistic === null ? <Spin size='small' /> : statistic.totalSubmissions}
              />
            <StatDetail icon={4}
              title={langConfig.totalCompetes}
              value={statistic === null ? <Spin size='small' /> : statistic.totalCompetes}
              />
        </div>
      </div>
    </div>
  )
}

export default Statistics
