import { useState, useEffect } from 'react'

import api from '../api'
import { CompeteLeaderboard as Leaderboard } from '../components/table'

import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

const CompeteLeaderboard = () => {
  // useParams
  const { competeId } = useParams()

  // Local States
  const [leaderboard, setLeaderboard] = useState(null)

  // Get Compete Leaderboard
  const getCompeteLeaderboard = async () => {
    try {
      const { data } = await api.get(`/competes/${competeId}/leaderboard`)
      const { leaderboard } = data.data
      // console.log(data)

      // Set Value
      setLeaderboard(leaderboard)
      // console.table(leaderboard)
    } catch (error) {
      console.log(error)
    }
  }

  // Initally get compete leaderboard
  useEffect(() => {
    getCompeteLeaderboard()
  }, [])
  return (
    <div className="flex flex-col w-full">
      {leaderboard === null
        ? <Spin size="default" />
        : <Leaderboard leaderboard={leaderboard} />
      }
    </div>
  )
}

export default CompeteLeaderboard
