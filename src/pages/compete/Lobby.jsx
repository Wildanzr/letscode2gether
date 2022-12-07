import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { CompeteHeader } from '../../components/other'

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
      //   console.log(compete)

      // Set Value
      setCompete(compete)
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
              ? <Spin size="default" />
              : isJoined && compete
                ? <CompeteHeader compete={compete} />
                : 'Oops you are not joined yet'
            }

        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default CompeteLobbyPage
