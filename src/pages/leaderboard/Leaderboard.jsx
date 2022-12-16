import langConfig from '../../config/langConfig.json'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import Leaderboard from '../../assets/leaderboard.svg'

import api from '../../api'
import { Leaderboard as LeaderboardTable } from '../../components/table'
import { Navbar, Footer } from '../../layout'

import { Spin } from 'antd'

const LeaderboardPage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local States
  const [leaderboard, setLeaderboard] = useState(null)

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

  // Initially get overall leaderboard
  useEffect(() => {
    getOverallLeaderboard()
  }, [])

  // Travel log
  useEffect(() => {
    if (user) {
      travelLog('Visiting overall leaderboard page')
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] py-5 flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
          <div className="flex w-full lg:w-1/3 items-center justify-center">
            <img src={Leaderboard} className="flex w-[60%]" />
          </div>

          <div className="flex w-full lg:w-2/3 items-center justify-center">
            <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
              <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
                {langConfig.userNav4}
              </p>
              <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.leaderboardDesc}
              </p>
              <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.leaderboardDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="flex w-full items-center justify-center pb-5 px-5 overflow-y-auto">
          <div className="flex flex-col w-10/12 lg:w-1/2 items-center justify-center">
            {leaderboard === null
              ? (
              <Spin size="default" />
                )
              : (
              <LeaderboardTable leaderboard={leaderboard} />
                )}
          </div>
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default LeaderboardPage
