import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { ListOfJourney } from '../../../components/table'
import { SearchDebounce } from '../../../components/other'

import Cookies from 'js-cookie'
import { Pagination } from 'antd'

const ManageJourneyPage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Learning Journeys',
      target: '/admin/manage/journeys'
    }
  ])

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
      const { data } = await api.get('/competes?page=1&limit=10&isLearnPath=true', config)
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
              Learning Journey
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Search */}
          <div className="flex flex-col m-0 space-y-5 lg:pt-0 w-full items-center justify-between">

            <div className="w-full hidden lg:flex">
              <SearchDebounce setJourneys={setJourneys} />
            </div>

            <div className="w-full hidden flex-row justify-end lg:flex">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>

            <div className="flex flex-row lg:hidden w-full space-x-5">
              <SearchDebounce setJourneys={setJourneys} />
            </div>

            <div className="w-full flex flex-row justify-center lg:hidden">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>
          </div>

          {/* Learning Journey Data */}
          <div className="flex flex-col w-full space-y-2 overflow-y-auto">
            <span className="text-xs font-ubuntu font-light text-main dark:text-snow duration-300 ease-in-out">
              * Learning journey was sorted by name, make sure it was sequence
              by their name.
            </span>
            <div className="flex flex-col pb-4 overflow-y-auto">
              <div className="flex w-full">
                {
                  journeys === null
                    ? <ListOfJourney journeys={null} setFetch={setFetch} />
                    : <ListOfJourney journeys={journeys} setFetch={setFetch} />
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

export default ManageJourneyPage
