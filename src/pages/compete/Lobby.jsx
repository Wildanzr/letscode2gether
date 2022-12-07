import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { CompeteHeader } from '../../components/other'
import { CompeteProblemList, CompeteLeaderboard } from '../../views'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'

const CompeteLobbyPage = () => {
  // useParams
  const { competeId } = useParams()

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [isJoined, setIsJoined] = useState(null)
  const [compete, setCompete] = useState(null)
  const [problems, setProblems] = useState(null)
  const [tabKey, setTabKey] = useState(1)

  // Check if user already joined
  const checkJoined = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/join/${competeId}`, config)
      const { isJoined } = data.data
      // console.log(data)

      // Set Value
      setIsJoined(isJoined)
    } catch (error) {
      console.log(error)
    }
  }

  // Get Compete Details
  const getCompeteDetails = async () => {
    try {
      const { data } = await api.get(`/competes/${competeId}`)
      const { compete } = data.data
      const { _id } = compete

      // Set Value
      setCompete(compete)

      await getCompeteProblems(_id)
    } catch (error) {
      console.log(error)
    }
  }

  // Get Compete Problems
  const getCompeteProblems = async (id) => {
    try {
      const { data } = await api.get(`/competes/${id}/problems`)
      const { problems } = data.data
      //   console.log(data)

      // Set Value
      setProblems(problems)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially check is user already joined
  useEffect(() => {
    if (user) {
      checkJoined()
    } else {
      setIsJoined(false)
    }
  }, [user])

  // Initially get compete details, when isJoined is updated
  useEffect(() => {
    if (isJoined) {
      getCompeteDetails()
    }
  }, [isJoined])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] flex-col w-full items-center justify-center">
          {isJoined === null && compete === null
            ? (
            <Spin size="default" />
              )
            : isJoined && compete
              ? (
            <div className="flex flex-col w-full h-screen items-center justify-start">
              <CompeteHeader compete={compete} />
              <div className="flex flex-col w-full items-center justify-center space-y-6">
                {/* Tabs */}
                <div className="flex bg-gray-200 rounded-lg">
                  <button
                    className={`whitespace-nowrap font-bold text-base tracking-wide flex-1 py-2 px-4 text-center rounded-lg focus:outline-none ${
                      tabKey === 1 ? 'bg-easy text-snow' : 'text-main'
                    }`}
                    onClick={() => setTabKey(1)}
                  >
                    Problems
                  </button>
                  <button
                    className={`whitespace-nowrap font-bold text-base tracking-wide flex-1 py-2 px-4 text-center rounded-lg focus:outline-none ${
                      tabKey === 2 ? 'bg-easy text-snow' : 'text-main'
                    }`}
                    onClick={() => setTabKey(2)}
                  >
                    Leaderboard
                  </button>
                </div>

                {/* Tab Content */}
                {tabKey === 1 && isJoined
                  ? (
                      compete === null || problems === null
                        ? (
                    <Spin size="default" />
                          )
                        : (
                    <CompeteProblemList
                      problems={problems}
                      competeId={compete._id}
                      compete={compete}
                    />
                          )
                    )
                  : (
                  <CompeteLeaderboard />
                    )}
              </div>
            </div>
                )
              : (
                  <div className="flex w-full h-screen items-center justify-center">
                    <p className='text-lg font-semibold'>Oops you are not join this compete</p>
                  </div>
                )}
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default CompeteLobbyPage
