import { useGlobal } from '../../contexts/GlobalContext'

import { BsCaretLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  // Navigator
  const navigate = useNavigate()

  // Global States
  const { globalState } = useGlobal()
  const { colHide, setColHide, colSideContent, setColSideContent } =
    globalState

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
    <div className="flex flex-row lg:flex-col w-full lg:w-[10%] h-[7%] lg:h-full font-ubuntu py-2 px-2 z-40 items-center">
      <div className="flex flex-row lg:flex-col w-5/6 lg:w-full space-x-4 lg:space-y-4 lg:space-x-0 lg:mt-5 items-center justify-center text-snow">
        <button
          className="flex flex-row group space-x-1 items-center py-1 px-2 lg:w-full justify-center rounded-sm text-main dark:text-snow font-bold border-2 border-main dark:border-snow hover:text-easy hover:border-easy dark:hover:border-easy duration-300 ease-in-out"
          onClick={() => navigate(-1)}
        >
          <BsCaretLeft className='fill-main dark:fill-snow w-5 h-5 duration-300 ease-in-out group-hover:fill-easy'/>
          <span className='text-main dark:text-snow duration-300 ease-in-out group-hover:text-easy'>Back</span>
        </button>

        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-easy dark:bg-main rounded-sm border-b-2 border-main dark:border-snow hover:border-medium dark:hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('problems')}
        >
          Problem
        </button>

        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-easy dark:bg-main rounded-sm border-b-2 border-main dark:border-snow hover:border-medium dark:hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('submissions')}
        >
          Submissions
        </button>

        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-easy dark:bg-main rounded-sm border-b-2 border-main dark:border-snow hover:border-medium dark:hover:border-easy duration-300 ease-in-out"
          onClick={() => handleChangeSideContent('leaderboards')}
        >
          Leaderboards
        </button>
      </div>
    </div>
  )
}

export default Navbar
