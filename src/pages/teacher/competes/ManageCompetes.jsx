import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { ListOfCompete } from '../../../components/table'
import { CompeteSearch } from '../../../components/other'

import Cookies from 'js-cookie'
import { Pagination } from 'antd'

const ManageCompetesPage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Competes',
      target: '/teacher/manage/journeys'
    }
  ])

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  const [journeys, setJourneys] = useState(null)
  const [fetch, setFetch] = useState(true)
  const [defaultCurrent, setDefaultCurrent] = useState(1)
  const [total, setTotal] = useState(10)

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
  }

  const fetchJourneys = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const ENDPOINT = `/competes?page=1&limit=10&isLearnPath=false&isChallenge=false&challengerId=${user._id}`
      console.log(ENDPOINT)
      const { data } = await api.get(ENDPOINT, config)
      // console.log(data)

      const { meta } = data
      const { competes } = data.data

      setDefaultCurrent(parseInt(meta.page))
      setTotal(parseInt(meta.total))
      setJourneys(competes)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial fetch journey
  useEffect(() => {
    if (fetch) {
      fetchJourneys()
      setFetch(false)
    }
  }, [fetch])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              Competes
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Search */}
          <div className="flex flex-col m-0 space-y-5 lg:pt-0 w-full items-center justify-between">

            <div className="w-full hidden lg:flex">
              <CompeteSearch setJourneys={setJourneys} />
            </div>

            <div className="w-full hidden flex-row justify-end lg:flex">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>

            <div className="flex flex-row lg:hidden w-full space-x-5">
              <CompeteSearch setJourneys={setJourneys} />
            </div>

            <div className="w-full flex flex-row justify-center lg:hidden">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>
          </div>

          {/* Competes Data */}
          <div className="flex flex-col w-full space-y-2 overflow-y-auto">
            <div className="flex flex-col pb-4 overflow-y-auto">
              <div className="flex w-full">
                {
                  journeys === null
                    ? <ListOfCompete journeys={null} setFetch={setFetch} />
                    : <ListOfCompete journeys={journeys} setFetch={setFetch} competes={true} />
                }
              </div>
            </div>
          </div>

        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default ManageCompetesPage
