import { useState, useEffect } from 'react'

import { Navbar, Footer } from '../../layout'
import api from '../../api'
import { UserProfile, UserJourney } from '../../components/card'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  // useParams
  const { username } = useParams()

  // Local States
  const [profileDetails, setProfileDetails] = useState(null)
  const [journeyDetails, setJourneyDetails] = useState(null)

  // Get profile details
  const getProfileDetails = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/user/profile/${username}`, config)
      const { user, journey } = data.data
      console.log(data)

      // Set Value
      setProfileDetails(user)
      setJourneyDetails(journey)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get user data
  useEffect(() => {
    getProfileDetails()
  }, [])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex w-full items-center justify-center">
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
            {profileDetails === null
              ? <Spin size="default" />
              : <div className='flex flex-col'>
                <UserProfile profileDetails={profileDetails} />
                <UserJourney journeyDetails={journeyDetails} />
              </div>
            }
            </div>
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default ProfilePage
