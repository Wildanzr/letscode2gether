import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import Learn from '../../assets/learn.svg'
import { Navbar, Footer } from '../../layout'

const MaterialPage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local states
  const [from] = useState(new Date())

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) travelLog('Visiting materials page', from, new Date())
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] py-5 flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
          <div className="flex w-full lg:w-1/3 items-center justify-center">
            <img src={Learn} className="flex w-[60%]" />
          </div>

          <div className="flex w-full lg:w-2/3 items-center justify-center">
            <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
              <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
                {langConfig.userNav0}
              </p>
              <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.materialDesc}
              </p>
              <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
                {langConfig.materialDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-5 w-full px-[5%]">
          <p>This is content</p>
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default MaterialPage
