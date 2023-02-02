import { useState, useEffect } from 'react'

import api from '../../api'
import { CPLeaderboard } from '../../components/table'

import { useParams } from 'react-router-dom'
import { Spin, Pagination } from 'antd'

const Leaderboard = () => {
  // useParams
  const { competeProblemId } = useParams()

  // Local States
  const [leaderboard, setLeaderboard] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(10)
  const [fetch, setFetch] = useState(true)
  const [start, setStart] = useState(limit - 10)

  // Handle pagination change
  const onShowSizeChange = (current, pageSize) => {
    setPage(current)
    setLimit(pageSize)
    setStart(pageSize - (pageSize - (current - 1) * pageSize))
    setFetch(true)
  }

  // Get leaderboard
  const getLeaderboard = async () => {
    // Reset leaderboard
    setLeaderboard([])

    try {
      const { data } = await api.get(`/compete-problems/${competeProblemId}/leaderboard?page=${page}&limit=${limit}`)
      const { meta } = data
      const { leaderboard } = data.data

      // Set value
      setLeaderboard(leaderboard)
      setLimit(meta.limit)
      setTotal(meta.total)
      setPage(meta.page)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get leaderboard
  useEffect(() => {
    if (fetch) {
      getLeaderboard()
      setFetch(false)
    }
  }, [fetch])
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="w-full flex flex-col items-center justify-center">
        {leaderboard === null
          ? <Spin size='default' />
          : leaderboard.length === 0
            ? <p className="text-white">No one has solved this problem yet</p>
            : <div className="flex flex-col w-full space-y-4 items-center justify-center">
              <CPLeaderboard data={leaderboard} start={start} />
              <Pagination
                onChange={onShowSizeChange}
                showSizeChanger
                defaultCurrent={page}
                total={total}
                locale={{ items_per_page: ' / halaman' }}
              />
            </div>
        }
      </div>
    </div>
  )
}

export default Leaderboard
