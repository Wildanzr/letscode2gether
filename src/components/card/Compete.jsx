import { useGlobal } from '../../contexts/GlobalContext'
import { momentId } from '../../constants/momentID'

import { Link } from 'react-router-dom'
import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const Compete = (props) => {
  // Props destructuring
  const { challenger, description, end, start, name, setSelectedCompete } = props
  const { username } = challenger
  //   console.log(props)

  // Global States
  const { globalState } = useGlobal()
  const { setTabs } = globalState

  // Join Compete
  const joinCompete = () => {
    // Reset selected compete
    setSelectedCompete(null)

    // Set selected compete
    setSelectedCompete(props)
  }

  return (
    <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
      <div className="flex w-full flex-col space-y-3">
        {/* Compete Title and Button Join */}
        <div className="flex flex-row w-full items-center justify-between">
          <p className="mb-0 font-ubuntu text-3xl tracking-wide font-medium">
            {name}
          </p>
          <label onClick={joinCompete} htmlFor='modal-join-compete' className="px-2 py-2 bg-easy text-snow cursor-pointer whitespace-nowrap rounded font-medium">
            Join Now
          </label>
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
