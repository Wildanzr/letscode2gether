import langConfig from '../config/langConfig.json'

import { useState, useEffect } from 'react'
import { useGlobal } from '../contexts/GlobalContext'
import { useAuth } from '../contexts/AuthContext'
import Letscode from '../assets/letscode.svg'

import Profile from './Profile'

import { motion } from 'framer-motion'
import {
  RiMoonClearFill,
  RiSunFill,
  RiMenuFill,
  RiCloseFill
} from 'react-icons/ri'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = (props) => {
  // Destructure props
  const { children } = props

  // Global States
  const { globalState, globalFunctions } = useGlobal()
  const { tabs, setTabs, toggle, setToggle } = globalState
  const { mySwal } = globalFunctions

  // Auth States
  const { authStates } = useAuth()
  const { user, setUser, setIsAuthenticated } = authStates

  // Location
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')
  const isTeacher = location.pathname.includes('teacher')

  // Local States
  const [paths, setPaths] = useState(
    user !== null && user.role === 2 && isAdmin
      ? [
          {
            to: '/admin/dashboard',
            name: langConfig.adminNav1,
            no: 1
          },
          {
            to: '/admin/manage/journeys',
            name: langConfig.adminNav2,
            no: 2
          },
          {
            to: '/admin/manage/challenges',
            name: langConfig.adminNav3,
            no: 3
          }
        ]
      : user !== null && user.role === 1 && isTeacher
        ? [
            {
              to: '/teacher/dashboard',
              name: langConfig.teacherNav1,
              no: 1
            },
            {
              to: '/teacher/manage/competes',
              name: langConfig.teacherNav2,
              no: 2
            }
          ]
        : [
            {
              to: '/learning-journey',
              name: langConfig.userNav1,
              no: 1
            },
            {
              to: '/challenges',
              name: langConfig.userNav2,
              no: 2
            },
            {
              to: '/competes',
              name: langConfig.userNav3,
              no: 3
            },
            {
              to: '/leaderboards',
              name: langConfig.userNav4,
              no: 4
            }
          ]
  )

  // Navigator
  const navigate = useNavigate()

  // Motion Configuration
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }

  const handleClickMobile = (no) => {
    setTabs(no)
    setToggle(!toggle)
  }

  //   Logout function
  const handleLogout = () => {
    // Remove jwtToken from cookies
    Cookies.remove('jwtToken')

    // Set isAuthenticated to false
    setIsAuthenticated(false)
    setUser(null)
    setTabs(0)

    // Redirect to home
    navigate('/')
  }

  // Dialog logout
  const dialogLogout = () => {
    mySwal
      .fire({
        title: langConfig.dialogLogout,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, keluar!',
        cancelButtonText: 'Nanti saja',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          // show loading 2 second
          mySwal
            .fire({
              title: langConfig.infoSeeYouAgain,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                mySwal.showLoading()
              }
            })
            .then(() => {
              handleLogout()
            })
        }
      })
  }

  // Monitor user changes
  useEffect(() => {
    setPaths(
      user !== null && user.role === 2 && isAdmin
        ? [
            {
              to: '/admin/dashboard',
              name: langConfig.adminNav1,
              no: 1
            },
            {
              to: '/admin/manage/journeys',
              name: langConfig.adminNav2,
              no: 2
            },
            {
              to: '/admin/manage/challenges',
              name: langConfig.adminNav3,
              no: 3
            }
          ]
        : user !== null && user.role === 1 && isTeacher
          ? [
              {
                to: '/teacher/dashboard',
                name: langConfig.teacherNav1,
                no: 1
              },
              {
                to: '/teacher/manage/competes',
                name: langConfig.teacherNav2,
                no: 2
              }
            ]
          : [
              {
                to: '/materials',
                name: langConfig.userNav0,
                no: 0
              },
              {
                to: '/learning-journey',
                name: langConfig.userNav1,
                no: 1
              },
              {
                to: '/challenges',
                name: langConfig.userNav2,
                no: 2
              },
              {
                to: '/competes',
                name: langConfig.userNav3,
                no: 3
              },
              {
                to: '/leaderboards',
                name: langConfig.userNav4,
                no: 4
              }
            ]
    )
  }, [user])

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {/* Basic Navbar */}
      <div className="flex flex-row w-full px-5 py-2 bg-snow dark:bg-main ease-in-out items-center justify-between duration-300">
        {/* Hide if the screen lg */}
        <div className="flex lg:hidden flex-row items-center space-x-5">
          <Link to="/" onClick={() => setTabs(0)}>
            <img src={Letscode} className="w-full h-full" />
          </Link>
        </div>

        {/* Show if the screen lg */}
        <div className="hidden lg:flex flex-row items-center space-x-5">
          <Link to="/" onClick={() => setTabs(0)}>
            <img src={Letscode} className="w-full h-full" />
          </Link>
          {paths.map((path, index) => (
            <Link
              to={path.to}
              key={index}
              onClick={() => setTabs(path.no)}
              className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${
                tabs === path.no ? 'border-b-2' : ''
              }`}
            >
              {path.name}
            </Link>
          ))}
        </div>

        {/* Hide if the screen lg */}
        <div className="flex lg:hidden flex-row items-center space-x-5">
          { user
            ? <Profile user={user} dialogLogout={dialogLogout} />
            : null
          }
          <DarkSwitch />
          <motion.div
            className="flex items-center justify-center rounded-full"
            onClick={() => setToggle(!toggle)}
            layout
            transition={spring}
          >
            <motion.div whileTap={{ rotate: 360 }}>
              {toggle
                ? (
                <RiMenuFill className="h-6 w-6 text-main dark:text-snow duration-300 ease-in-out" />
                  )
                : (
                <RiCloseFill className="h-6 w-6 text-main dark:text-snow duration-300 ease-in-out" />
                  )}
            </motion.div>
          </motion.div>
        </div>

        {/* Unhide if the screen lg */}
        <div className="hidden lg:flex flex-row items-center space-x-5">
          <DarkSwitch />
          {user
            ? (
            <Profile user={user} dialogLogout={dialogLogout} />
              )
            : (
            <>
              <Link
                to="/auth/login"
                onClick={() => setTabs(5)}
                className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${
                  tabs === 5 ? 'border-b-2' : ''
                }`}
              >
                {langConfig.userNav5}
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setTabs(6)}
                className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${
                  tabs === 6 ? 'border-b-2' : ''
                }`}
              >
                {langConfig.userNav6}
              </Link>
            </>
              )}
        </div>
      </div>

      {/* Navbar for Mobile */}
      <div
        className={`w-full lg:hidden ${
          toggle ? 'h-0 hidden' : 'flex flex-col h-full'
        } transition-all space-y-2 items-center bg-milk dark:bg-alternate duration-300 py-3`}
      >
        {paths.map((path, index) => (
          <Link
            to={path.to}
            key={index}
            onClick={() => handleClickMobile(path.no)}
            className={
              'w-full text-main py-1 dark:text-snow text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
            }
          >
            {langConfig[`userNav${index + 1}`]}
          </Link>
        ))}

        {user
          ? (
          <>
            <Link
              to={`/profile/${user.username}`}
              className={
                'w-full text-main py-1 dark:text-snow text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
              }
            >
              {langConfig.menu1}
            </Link>

            <Link
              to={'/settings'}
              className={
                'w-full text-main py-1 dark:text-snow text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
              }
            >
              {langConfig.menu2}
            </Link>

            <div
              onClick={dialogLogout}
              className={
                'w-full text-hard text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
              }
            >
              {langConfig.userNav7}
            </div>
          </>
            )
          : (
          <>
            <Link
              to={'/auth/login'}
              onClick={() => handleClickMobile(6)}
              className={
                'w-full text-main py-1 dark:text-snow text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
              }
            >
              {langConfig.userNav5}
            </Link>

            <Link
              to={'/auth/register'}
              onClick={() => handleClickMobile(6)}
              className={
                'w-full text-main py-1 dark:text-snow text-base text-center tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300'
              }
            >
              {langConfig.userNav6}
            </Link>
          </>
            )}
      </div>

      {/* Children */}
      {children}
    </div>
  )
}

const DarkSwitch = () => {
  // Global States
  const { globalState } = useGlobal()
  const { isOn, setIsOn } = globalState

  // Motion Configuration
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }

  return (
    <div
      onClick={() => setIsOn(!isOn)}
      className={'flex rounded-full shadow-inner hover:cursor-pointer'}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {isOn
            ? (
            <RiSunFill className="h-6 w-6 text-medium" />
              )
            : (
            <RiMoonClearFill className="h-6 w-6 text-snow" />
              )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Navbar
