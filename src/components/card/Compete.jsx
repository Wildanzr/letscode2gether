import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'

import { momentId } from '../../constants/momentID'
import api from '../../api'

import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import { Spin } from 'antd'

moment.updateLocale('id', momentId)

const Compete = (props) => {
  // Props destructuring
  const { challenger, description, end, start, name, _id, setSelectedCompete } = props
  const { username } = challenger

  // Global States
  const { globalState, globalFunctions } = useGlobal()
  const { setTabs } = globalState
  const { mySwal } = globalFunctions

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Local States
  const [isJoined, setIsJoined] = useState(null)

  // Join Compete
  const joinCompete = () => {
    if (!user) {
      mySwal.fire({
        icon: 'error',
        title: 'You must login first!',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false
      })

      // Close modal from daisyUI
      document.getElementById('modal-join-compete').checked = true
    } else {
      // Reset selected compete
      setSelectedCompete(null)

      // Set selected compete
      setSelectedCompete(props)
    }
  }

  // Check if user already joined
  const checkJoined = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/join/${_id}`, config)
      const { isJoined } = data.data
      // console.log(data)

      // Set Value
      setIsJoined(isJoined)
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

  return (
    <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
      <div className="flex w-full flex-col space-y-3">
        {/* Compete Title and Button Join */}
        <div className="flex flex-row w-full items-center justify-between">
          <p className="mb-0 font-ubuntu text-3xl tracking-wide font-medium">
            {name}
          </p>

          {isJoined === null
            ? <Spin size="small" />
            : isJoined
              ? <Link to={`${_id}/lobby`} className="px-2 py-2 bg-success text-main cursor-pointer whitespace-nowrap rounded font-medium"> Joined </Link>
              : <label onClick={joinCompete} htmlFor='modal-join-compete' className="px-2 py-2 bg-easy text-snow cursor-pointer whitespace-nowrap rounded font-medium">
                Join Now
              </label>
          }
        </div>

        {/* Compete Information */}
        <div className="flex flex-col w-full space-y-1 items-start">
          <p className="mb-0 text-sm font-ubuntu font-bold">
            Challenger:{' '}
            <Link
                to={`/profile/${username}`}
                onClick={() => setTabs(0)}
                className="pl-2 mb-0 text-sm font-ubuntu font-thin text-easy">
              {username}
            </Link>
          </p>
          <p className="mb-0 text-sm font-ubuntu font-bold">
            Starts In:{' '}
            <span className="mb-0 text-sm font-ubuntu font-thin">
              {moment(start).format('dddd, DD MMMM YYYY HH:mm')}
            </span>
          </p>
          <p className="mb-0 text-sm font-ubuntu font-bold">
            Ends In:{' '}
            <span className="pl-2 mb-0 text-sm font-ubuntu font-thin">
              {moment(end).format('dddd, DD MMMM YYYY HH:mm')}
            </span>
          </p>
          <p className="mb-0 text-sm font-ubuntu font-thin text-justify">
            <span className="font-bold">Description:</span> <br />
            {description}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Compete
