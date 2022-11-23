import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
// import { SearchDebounce } from '../../../components/other'
import { EditableListOfChallenge } from '../../../components/table'

import Cookies from 'js-cookie'
// import { Pagination } from 'antd'

const ManageChallengePage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Challenges',
      target: '/admin/manage/challenges'
    }
  ])

  const [competeId, setCompeteId] = useState(null)
  const [problems, setProblems] = useState(null)
  const [fetch, setFetch] = useState(true)
  const [secondFetch, setSecondFetch] = useState(false)
  // const [defaultCurrent, setDefaultCurrent] = useState(1)
  // const [total, setTotal] = useState(10)

  // const onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize)
  // }

  const fetchJourneys = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const { data } = await api.get('/competes?page=1&limit=10&isChallenge=true', config)
      // console.log(data)

      const { competes } = data.data
      setCompeteId(competes[0]._id)
      setSecondFetch(true)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchChallengeProblems = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${competeId}/problems`, config)
      // console.log(data)

      const { problems } = data.data
      setProblems(problems)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial fetch challenge journey
  useEffect(() => {
    if (fetch) {
      fetchJourneys()
      setFetch(false)
    }
  }, [fetch])

  // Initial fetch challenge problems
  useEffect(() => {
    if (secondFetch) {
      fetchChallengeProblems()
      setSecondFetch(false)
    }
  }, [secondFetch])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              Challenges
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Search */}
          {/* <div className="flex flex-col m-0 space-y-5 lg:pt-0 w-full items-center justify-between">

            <div className="w-full hidden lg:flex">
              <SearchDebounce setJourneys={setChallenges} />
            </div>

            <div className="w-full hidden flex-row justify-end lg:flex">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>

            <div className="flex flex-row lg:hidden w-full space-x-5">
              <SearchDebounce setJourneys={setChallenges} />
            </div>

            <div className="w-full flex flex-row justify-center lg:hidden">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>
          </div> */}

          {/* Challenges Data */}
          <div className="flex flex-col w-full space-y-2 overflow-y-auto">
            <div className="flex flex-col pb-4 overflow-y-auto">
              <div className="flex w-full">
                <EditableListOfChallenge problems={problems} cpId={competeId} setFetch={setFetch}/>
              </div>
            </div>
          </div>

        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default ManageChallengePage
