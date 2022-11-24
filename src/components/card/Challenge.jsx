import { Link } from 'react-router-dom'

const Challenge = (props) => {
  // Destructure props
  const { title, difficulty, maxPoint, competeId, competeProblemId } = props

  return (
    <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
      <div className="flex w-4/6 flex-col space-y-3">
        <p className="mb-0 font-ubuntu tracking-wide font-bold">
          {title}
        </p>
        <div className="flex flex-row w-full space-x-5 items-center">
          <p className="mb-0 text-sm font-ubuntu font-medium">
            Level:
            <span className={`pl-2 mb-0 text-sm font-ubuntu font-medium ${difficulty === 1 ? 'text-success' : difficulty === 2 ? 'text-medium' : 'text-hard'}`}>
              {difficulty === 1
                ? 'Easy'
                : difficulty === 2
                  ? 'Medium'
                  : 'Hard'
              }
            </span>
          </p>

          <p className="mb-0 text-sm font-ubuntu font-medium">
            Max Point:{' '}
            <span className="pl-2 mb-0 text-sm font-ubuntu font-medium text-easy">
              {maxPoint}
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-2/6 items-start justify-end">
        <Link
          to={`path/${competeId}/problems/${competeProblemId}`}
          className="w-full lg:w-2/3 py-2 bg-main dark:bg-snow text-snow dark:text-main text-center rounded font-medium lg:font-bold">
          Solved
        </Link>
      </div>
    </div>
  )
}

export default Challenge
