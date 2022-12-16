import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/GlobalContext'

import { Time } from '../card'

import { Spin } from 'antd'
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

  // Local States
  const [renderTime, setRenderTime] = useState(null)

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      if (moment().isBefore(moment(end))) {
        return <Spin size="default" />
      }

      return (
        <p className="mb-0 text-xl lg:text-3xl font-bold ">
          {langConfig.competeLobbyTimeUp}
        </p>
      )
    } else {
      // Render a countdown with days hours minutes and seconds in beautiful format
      return (
        <div className="flex flex-col space-y-4 py-5 lg:py-20 items-center justify-center">
          <p className="mb-0 text-xl lg:text-3xl font-black tracking-wide">
            {moment() < moment(start)
              ? langConfig.competeLobbyTimeStart
              : langConfig.competeLobbyTimeEnd}
          </p>
          <div className="flex flex-row space-x-3">
            <Time time={days} unit={langConfig.competeTimeDays} />
            <Time time={hours} unit={langConfig.competeTimeHours} />
            <Time time={minutes} unit={langConfig.competeTimeMinutes} />
            <Time time={seconds} unit={langConfig.competeTimeSeconds} />
          </div>
        </div>
      )
    }
  }

  // Initially set renderTime
  useEffect(() => {
    if (moment() < moment(start)) {
      setRenderTime(moment(start))
    } else {
      setRenderTime(moment(end))
    }
  }, [])

  // Auto update renderTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (moment() < moment(start)) {
        setRenderTime(moment(start))
      } else {
        setRenderTime(moment(end))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex px-[5%] flex-col-reverse lg:flex-row-reverse w-full items-center justify-center lg:justify-between space-y-4">
      <div className="flex w-full lg:w-1/3 items-center justify-center">
        {renderTime === null
          ? (
          <Spin size="default" />
            )
          : (
          <Countdown date={renderTime} renderer={renderer} />
            )}
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
              <p className="mb-0 text-sm font-ubuntu font-bold">
                {langConfig.competeChallenger}
              </p>
              <Link
                to={`/profile/${username}`}
                onClick={() => setTabs(0)}
                className="text-sm font-ubuntu font-thin text-easy"
              >
                {username}
              </Link>
            </div>

            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">
                {langConfig.competeStart}
              </p>
              <span className="mb-0 text-sm font-ubuntu font-thin">
                {moment(start).format('dddd, DD MMMM YYYY HH:mm')}
              </span>
            </div>

            <div className="flex flex-col w-full lg:flex-row space-y-2 lg:space-y-0 space-x-0 lg:space-x-4 items-center">
              <p className="mb-0 text-sm font-ubuntu font-bold">
                {langConfig.competeEnd}
              </p>
              <span className="mb-0 text-sm font-ubuntu font-thin">
                {moment(end).format('dddd, DD MMMM YYYY HH:mm')}
              </span>
            </div>

            <div className="flex flex-col w-full space-y-2 items-start">
              <p className="mb-0 text-sm font-ubuntu font-bold whitespace-nowrap">
                {langConfig.competeListDesc}
              </p>
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
