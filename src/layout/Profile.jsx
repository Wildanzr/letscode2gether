import { useState } from 'react'

import { Link } from 'react-router-dom'
import {
  RiShieldUserLine,
  RiSettings3Line,
  RiLogoutBoxRLine
} from 'react-icons/ri'

const Profile = (props) => {
  // Destructure props
  const { dialogLogout, user } = props

  const { username, avatar } = user

  // Local States
  const [visible, setVisible] = useState(false)

  return (
    <div className="font-ubuntu text-main dark:text-snow duration-300 ease-in-out">
      <button
        onClick={() => setVisible(!visible)}
        className="flex text-sm rounded-full"
      >
        <div className="flex flex-row items-center w-full space-x-4">
          <img
            src={avatar}
            width={32}
            height={32}
            className="rounded-full"
          />
          {/* show name */}
          <span className="text-base font-medium">{username}</span>
        </div>
      </button>
      {visible && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-3 bg-snow dark:bg-main space-y-3 divide-y-2 divide-main dark:divide-snow z-50">
          <div className="space-y-1">
            <Link
              to="/profile"
              className="px-4 py-2 text-sm text-main dark:text-snow flex flex-row items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <RiShieldUserLine className="text-lg" />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="px-4 py-2 text-sm text-main dark:text-snow flex flex-row items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <RiSettings3Line className="text-lg" />
              <span>Settings</span>
            </Link>
          </div>
          <div
            onClick={dialogLogout}
            className="px-4 py-2 text-sm cursor-pointer text-main dark:text-snow flex flex-row items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <RiLogoutBoxRLine className="text-lg" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
