import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../api'

import { Navbar, Footer } from '../../layout'
import { Statistics } from '../../views'
import { Leaderboard } from '../../components/table'

import { Spin } from 'antd'
import Cookies from 'js-cookie'

const DashboardPage = () => {
  // Local States
  const [leaderboard, setLeaderboard] = useState(null)
  const [statistic, setStatistic] = useState(null)

  // Get overall leaderboard
  const getOverallLeaderboard = async () => {
    try {
      const { data } = await api.get('/competes/overall-leaderboard')
      const { data: leaderboard } = data
      // console.log(data)

      // Set Value
      setLeaderboard(leaderboard)
    } catch (error) {
      console.log(error)
    }
  }

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
      console.log(data)

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

  // Initially get overall leaderboard
  useEffect(() => {
    getOverallLeaderboard()
    getDashboardStatistic()
  }, [])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          <Statistics
            statistic={statistic === null
              ? null
              : statistic
            }
          />

          {/* Leaderboard */}
          <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>
            {langConfig.dashboardLeaderboards}
          </h3>
          <div className="flex w-full items-center justify-center pb-5 overflow-y-auto">
            <div className="flex flex-col w-full items-center justify-center">
              {leaderboard === null
                ? (
                <Spin size="default" />
                  )
                : (
                <Leaderboard leaderboard={leaderboard} />
                  )}
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default DashboardPage
