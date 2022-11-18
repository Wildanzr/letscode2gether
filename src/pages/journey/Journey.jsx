import { useState, useEffect } from 'react'

import api from '../../api'
import Journey from '../../assets/journey.svg'
import B6 from '../../assets/badge6.svg'
import { Navbar, Footer } from '../../layout'
import { JourneyList } from '../../components/card'

import { Skeleton } from 'antd'
import Cookies from 'js-cookie'

const JourneyPage = () => {
  // Local states
  const [journeys, setJourneys] = useState(null)

  // Get all journeys
  const getAllJourneys = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get('/competes?page=1&limit=10&isLearnPath=true', config)
      // console.log(data)

      const { competes } = data.data
      setJourneys(competes)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get all journeys
  useEffect(() => {
    getAllJourneys()
  }, [])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
          <div className="flex w-full lg:w-1/3 items-center justify-center">
            <img src={Journey} className="flex w-[60%]" />
          </div>

          <div className="flex w-full lg:w-2/3 items-center justify-center">
            <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
              <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
                Learning Journey
              </p>
              <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
                This platform provides basic programming learning materials
                based on problem. Without siding with any of the programming
                languages. Here you can learn basic programming concepts then
                apply them to many programming languages.
              </p>
              <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
                This platform provides basic programming learning materials
                based on problem. Without siding with any of the programming
                languages. Here you can learn basic programming concepts then
                apply them to many programming languages.
              </p>

              <div className="flex flex-row space-x-4 items-center">
                <p className="mb-0 text-2xl font-ubuntu font-bold">
                  Overral progress:
                </p>
                <span className="mb-0 text-2xl font-ubuntu font-bold text-success">
                  30%
                </span>
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <p className="mb-0 text-2xl font-ubuntu font-bold">
                  Current badges:
                </p>
                <img src={B6} alt="badge" className="w-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-5 w-full px-[5%]">
          {journeys
            ? (
                journeys.map((journey, index) => (
                <JourneyList key={index} journey={journey} />
                ))
              )
            : <Skeleton active paragraph={5} />
          }
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default JourneyPage
