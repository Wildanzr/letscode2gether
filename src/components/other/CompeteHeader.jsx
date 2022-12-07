import { useGlobal } from '../../contexts/GlobalContext'

import { Time } from '../card'

import { Link } from 'react-router-dom'
import moment from 'moment'
import Countdown from 'react-countdown'

const CompeteHeader = (props) => {
  //   Props Destructuring
  const { compete } = props
  const { challenger, description, end, start, name } = compete
  const { username } = challenger

  //   Global States
  const { globalState } = useGlobal()
  const { setTabs } = globalState

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return 'Time is up!'
    } else {
      // Render a countdown with days hours minutes and seconds in beautiful format
      return (
        <div className="flex flex-row space-x-3 py-5 lg:py-20">
          <Time time={days} unit="Days" />
          <Time time={hours} unit="Hours" />
          <Time time={minutes} unit="Minutes" />
          <Time time={seconds} unit="Seconds" />
        </div>
      )
    }
  }

  return (
    <div className="flex px-[5%] flex-col-reverse lg:flex-row-reverse w-full items-center justify-center lg:justify-between space-y-4">
      <div className="flex w-full lg:w-1/3 items-center justify-center">
        <Countdown date={end} renderer={renderer} />
      </div>

      <div className="flex w-full lg:w-2/3 items-center justify-center">
        <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
          {/* Title */}
          <p className="mb-0 font-ubuntu text-3xl tracking-wide font-medium text-center lg:text-left">
            {name}
          </p>

          {/* Compete Information */}
          <div className="flex flex-col w-full space-y-2 items-start">

            {/* Challenger */}
            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">Challenger: </p>
              <Link
                to={`/profile/${username}`}
                onClick={() => setTabs(0)}
                className="text-sm font-ubuntu font-thin text-easy"
              >
                {username}
              </Link>
            </div>

            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">Starts In: </p>
              <span className="mb-0 text-sm font-ubuntu font-thin">
                {moment(start).format('dddd, DD MMMM YYYY HH:mm')}
              </span>
            </div>

            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">Starts In: </p>
              <span className="mb-0 text-sm font-ubuntu font-thin">
                {moment(end).format('dddd, DD MMMM YYYY HH:mm')}
              </span>
            </div>

            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">Description: </p>
              <span className="mb-0 text-sm font-ubuntu font-thin">
                {description}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CompeteHeader
