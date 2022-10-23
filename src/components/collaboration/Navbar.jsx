import { useGlobal } from '../../contexts/GlobalContext'

import Letscode from '../../assets/letscode.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { globalState } = useGlobal()

  const { colHide, setColHide, colSideContent, setColSideContent, setTabs } = globalState

  const handleChangeSideContent = (origin) => {
    if (colHide && colSideContent === origin) {
      setColHide(false)
    } else {
      setColHide(true)
    }

    setColSideContent(origin)
    switch (origin) {
      case 'problems':
        setColSideContent('problems')
        break
      case 'submissions':
        setColSideContent('submissions')
        break
      case 'leaderboards':
        setColSideContent('leaderboards')
        break
    }
  }
  return (
    <div className="flex flex-row lg:flex-col w-full lg:w-[10%] h-[7%] lg:h-screen font-ubuntu py-2 px-2 z-40 bg-alternate items-center">
      <Link to='/' onClick={() => setTabs(0)}>
        <img src={Letscode} className="w-full h-full py-2" />
      </Link>
      <div className="flex flex-row lg:flex-col w-5/6 lg:w-full space-x-4 lg:space-y-4 lg:space-x-0 lg:mt-5 items-center justify-center text-white">
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-main rounded-sm border-b-2 border-white hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('problems')}
        >
          Problems
        </button>
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-main rounded-sm border-b-2 border-white hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('submissions')}
        >
          Submissions
        </button>
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-main rounded-sm border-b-2 border-white hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('leaderboards')}
        >
          Leaderboards
        </button>
      </div>
    </div>
  )
}

export default Navbar
