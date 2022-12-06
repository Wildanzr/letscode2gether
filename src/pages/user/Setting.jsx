import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { UpdateProfile, UpdatePassword } from '../../components/form'

import Cookies from 'js-cookie'
import { Spin } from 'antd'

const SettingPage = () => {
  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [userDetails, setUserDetails] = useState(null)
  const [tabKey, setTabKey] = useState(1)
  const [fetch, setFetch] = useState(true)
  const fetcher = {
    fetch,
    setFetch
  }

  // Get profile details
  const getProfileDetails = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
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

  // Initially get user data
  useEffect(() => {
    if (fetch) {
      getProfileDetails()
      setFetch(false)
    }
  }, [fetch])

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
                Update Profile
              </button>
              <button
                className={`whitespace-nowrap font-bold text-base tracking-wide flex-1 py-2 px-4 text-center rounded-lg focus:outline-none ${tabKey === 2 ? 'bg-easy text-snow' : 'text-main'}`}
                onClick={() => setTabKey(2)}
              >
                Change Password
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
