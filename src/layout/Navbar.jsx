import { useGlobal } from '../contexts/GlobalContext'
import Letscode from '../assets/letscode.svg'

import { motion } from 'framer-motion'
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Navbar = () => {
  // Global States
  const { globalState } = useGlobal()
  const { tabs, setTabs, paths, isOn, setIsOn } = globalState

  // Motion Configuration
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }

  return (
    <div className="flex flex-row w-full bg-snow dark:bg-main ease-in-out items-center justify-between px-5 py-2 duration-300">
      <div className="flex flex-row items-center space-x-5">
        <Link to='/' onClick={() => setTabs(0)}>
          <img src={Letscode} className="w-full h-full" />
        </Link>
        {paths.map((path, index) => (
            <Link
            to={path.to}
            key={index}
            onClick={() => setTabs(path.no)}
            className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${tabs === path.no ? 'border-b-2' : ''}`}
          >
            {path.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-row items-center space-x-5">
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
              {isOn ? (<RiSunFill className="h-6 w-6 text-medium" />) : (<RiMoonClearFill className="h-6 w-6 text-snow" />)}
            </motion.div>
          </motion.div>
        </div>
        <Link
          to='/auth/login'
          onClick={() => setTabs(5)}
          className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${tabs === 5 ? 'border-b-2' : ''}`}
        >
          Login
        </Link>
        <Link
          to='/auth/register'
          onClick={() => setTabs(6)}
          className={`text-main dark:text-snow text-base tracking-wide whitespace-nowrap font-ubuntu font-medium hover:text-easy dark:hover:text-easy border-easy ease-in-out duration-300 ${tabs === 6 ? 'border-b-2' : ''}`}
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default Navbar
