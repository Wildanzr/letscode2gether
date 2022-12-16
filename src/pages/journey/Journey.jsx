import langConfig from '../../config/langConfig.json'

import B1 from '../../assets/badge1.svg'
import B2 from '../../assets/badge2.svg'
import B3 from '../../assets/badge3.svg'
import B4 from '../../assets/badge4.svg'
import B5 from '../../assets/badge5.svg'
import B6 from '../../assets/badge6.svg'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import Journey from '../../assets/journey.svg'
import { Navbar, Footer } from '../../layout'
import { JourneyList } from '../../components/card'

import { Skeleton, Spin } from 'antd'
import Cookies from 'js-cookie'

const JourneyPage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local states
  const [journeys, setJourneys] = useState(null)
  const [progress, setProgress] = useState(null)
  const [point, setPoint] = useState(null)

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

  // Check progress of journey
  const checkProgress = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get('/competes/journey-progress', config)
      const { progress, point } = data.data
      // console.log(data)

      // Set Value
      setProgress(progress)
      setPoint(point)
    } catch (error) {
      console.log(error)
    }
  }

  // Define badge
  const defineBadge = (point) => {
    if (point === 0) {
      return <p className='mb-0 text-2xl font-ubuntu font-bold text-success'>-</p>
    } else if (point < 500) {
      return <img src={B1} className="w-14" />
    } else if (point < 1000) {
      return <img src={B2} className="w-14" />
    } else if (point < 1500) {
      return <img src={B3} className="w-14" />
    } else if (point < 2000) {
      return <img src={B4} className="w-14" />
    } else if (point < 2500) {
      return <img src={B5} className="w-14" />
    } else {
      return <img src={B6} className="w-14" />
    }
  }

  // Initially get all journeys
  useEffect(() => {
    if (user) {
      checkProgress()
    } else {
      setProgress(0)
      setPoint(0)
    }

    getAllJourneys()
  }, [])

  // Travel log
  useEffect(() => {
    if (user) {
      travelLog('Visiting learning journey page')
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] py-5 flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
          <div className="flex w-full lg:w-1/3 items-center justify-center">
            <img src={Journey} className="flex w-[60%]" />
          </div>

          <div className="flex w-full lg:w-2/3 items-center justify-center">
            <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
              <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
                {langConfig.userNav1}
              </p>
              <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.journeyDesc}
              </p>
              <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.journeyDesc}
              </p>

              <div className="flex flex-col w-full space-y-2">
              <div className="flex flex-row space-x-4 items-center">
                <p className="mb-0 text-2xl font-ubuntu font-bold">
                  {langConfig.journeyProgress}
                </p>
                <div className="mb-0 text-2xl font-ubuntu font-bold text-success">
                  {progress === null
                    ? <Spin size="small" />
                    : `${progress}%`
                  }
                </div>
              </div>

              <div className="flex flex-row space-x-4 items-center">
                <p className="mb-0 text-2xl font-ubuntu font-bold">
                  {langConfig.journeyBadges}
                </p>
                {point === null
                  ? <Spin size="small" />
                  : defineBadge(point)
                }
              </div>
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
