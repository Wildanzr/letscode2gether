import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { UpdateProfile, UpdatePassword } from '../../components/form'

import Cookies from 'js-cookie'
import { Spin } from 'antd'

const SettingPage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local States
  const [userDetails, setUserDetails] = useState(null)
  const [tabKey, setTabKey] = useState(1)
  const [fetch, setFetch] = useState(true)
  const [from] = useState(new Date())
  const fetcher = {
    fetch,
    setFetch
  }

  // Get profile details
  const getProfileDetails = async (user) => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    // Check if user is null
    if (user === null) {
      await getUserData()
    }

    try {
      const { data } = await api.get(`/user/profile/${user.username}`, config)
      const { user: userDetails } = data.data
      // console.log(data)

      // Set Value
      setUserDetails(userDetails)
    } catch (error) {
      console.log(error)
    }
  }

  // Local get user data
  const getUserData = async () => {
    // Set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    await api.get('/auth/me', config).then((res) => {
      // console.log(res.data)
      getProfileDetails(res.data.data.user)
    })
  }

  // Initially get user data
  useEffect(() => {
    if (fetch) {
      getProfileDetails(user)
      setFetch(false)
    }
  }, [fetch])

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) travelLog('Visiting user setting page', from, new Date())
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow font-ubuntu dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col w-full lg:w-1/2 items-center justify-center space-y-6">

            {/* Tabs */}
            <div className="flex bg-gray-200 rounded-lg">
              <button
                className={`whitespace-nowrap font-bold text-base tracking-wide flex-1 py-2 px-4 text-center rounded-lg focus:outline-none ${tabKey === 1 ? 'bg-easy text-snow' : 'text-main'}`}
                onClick={() => setTabKey(1)}
              >
                {langConfig.updateProfileTab1}
              </button>
              <button
                className={`whitespace-nowrap font-bold text-base tracking-wide flex-1 py-2 px-4 text-center rounded-lg focus:outline-none ${tabKey === 2 ? 'bg-easy text-snow' : 'text-main'}`}
                onClick={() => setTabKey(2)}
              >
                {langConfig.updateProfileTab2}
              </button>
            </div>

            {userDetails === null
              ? <Spin size="default" />
              : tabKey === 1
                ? <UpdateProfile userDetails={userDetails} {...fetcher} />
                : <UpdatePassword />
            }

          </div>
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default SettingPage
