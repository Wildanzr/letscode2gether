import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { UpdateProfile } from '../../components/form'

import Cookies from 'js-cookie'
import { Divider, Spin } from 'antd'

const SettingPage = () => {
  // Theme from local storage
  const theme = localStorage.getItem('theme')

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [userDetails, setUserDetails] = useState(null)
  const [fetch, setFetch] = useState(true)
  const fetcher = {
    fetch, setFetch
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
          <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">

            <h1 className='text-3xl tracking-wide text-main dark:text-snow'>Update Profile</h1>
            {userDetails === null
              ? <Spin size="default" />
              : <UpdateProfile userDetails={userDetails} {...fetcher} />
            }

            <Divider
              style={{
                backgroundColor: theme === 'light' ? '#111827' : '#f2f4f7'
              }}
            />
            <h1>Change Password</h1>
          </div>
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default SettingPage
