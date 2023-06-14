import langConfig from '../../config/langConfig.json'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import Learn from '../../assets/learn.svg'
import Collaborate from '../../assets/collaborate.svg'
import Compile from '../../assets/compile.svg'

import { Navbar, Footer } from '../../layout'

import { Link } from 'react-router-dom'
import { RiArrowRightSLine } from 'react-icons/ri'

const HomePage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local States
  const [from] = useState(new Date())

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) travelLog('Visiting home page', from, new Date())
    }
  }, [user])
  return (
    <div className="flex flex-col w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      {/* Info 1 */}
      <div className="flex px-5 flex-col lg:flex-row w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Learn} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              {langConfig.home1}
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home1Desc}
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home1Desc}
            </p>
            <Link to='/learning-journey' className='flex flex-row items-center space-x-4 px-10 py-3 rounded-full font-ubuntu font-medium text-lg text-snow hover:text-snow bg-easy'>
              {langConfig.home1Button} <RiArrowRightSLine className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>

      {/* Info 2 */}
      <div className="flex px-5 flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-around">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Collaborate} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              {langConfig.home2}
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home2Desc}
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home2Desc}
            </p>
            <Link to='/collab' className='flex flex-row items-center space-x-4 px-10 py-3 rounded-full font-ubuntu font-medium text-lg text-snow hover:text-snow bg-easy'>
              {langConfig.home2Button} <RiArrowRightSLine className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>

      {/* Info 3 */}
      <div className="flex px-5 flex-col lg:flex-row w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Compile} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              {langConfig.home3}
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home3Desc}
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
              {langConfig.home3Desc}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
