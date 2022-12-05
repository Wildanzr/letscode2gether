import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import { Problem, Submission, Leaderboard } from '../sideContent'

import { Spin } from 'antd'
import { Link } from 'react-router-dom'

const SideContent = () => {
  // Global States
  const { globalState } = useGlobal()
  const { colHide, colSideContent } = globalState

  // Collab States
  const { problemStates } = useCollab()
  const { competeProblem } = problemStates

  return (
    <div
      className={`flex ${
        colHide
          ? 'w-full lg:w-1/2 h-full py-2 px-2'
          : 'w-full lg:w-0 h-0 lg:h-full py-0 px-0'
      } bg-milk dark:bg-alternate font-ubuntu space-y-4 transition-all ease-in-out duration-500 overflow-y-auto`}
    >
      <div className={`${colHide ? 'flex' : 'hidden'} flex-colS w-full h-full`}>

        {/* Title and Challenger */}
        <div className="flex flex-col w-full p-2">
          {competeProblem
            ? <div className='flex flex-col w-full space-y-1 pb-5'>
              <h4 className="mb-0 text-lg lg:text-2xl font-semibold text-main dark:text-snow duration-300 ease-in-out">
                {competeProblem.title}
              </h4>
              <p className="mb-0 text-sm font-thin">
                Challenger:
                <Link
                  to={`/@/${competeProblem.challenger.username}`}
                  className="ml-2 font-medium text-easy"
                >
                  {competeProblem.challenger.username}
                </Link>
              </p>
            </div>
            : <Spin size="small" />
          }

        {/* Define side content */}
          {colSideContent === 'problems'
            ? <Problem />
            : colSideContent === 'submissions'
              ? <Submission />
              : <Leaderboard />
          }
        </div>
      </div>
    </div>
  )
}

export default SideContent
