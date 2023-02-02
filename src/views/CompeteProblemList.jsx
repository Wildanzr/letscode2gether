import langConfig from '../config/langConfig.json'

import { useState, useEffect } from 'react'

import { Challenge } from '../components/card'

import moment from 'moment/moment'

import { Skeleton } from 'antd'

const CompeteProblemList = (props) => {
  // Props destructuring
  const { problems, competeId, compete } = props

  // Local States
  const [solveButton, setSolveButton] = useState(false)

  // Monitor start and end time to change solve button
  useEffect(() => {
    const interval = setInterval(() => {
      setSolveButton(
        compete
          ? moment().isAfter(moment(compete.end)) || moment().isBefore(moment(compete.start))
          : false)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col m-0 px-[5%] pb-10 space-y-5 lg:pt-0 w-full items-center justify-center">
        {problems === null
          ? <Skeleton active paragraph={{ rows: 4 }} />
          : problems.length === 0
            ? <p className="text-2xl font-ubuntu font-medium">
              {langConfig.competeProblemNoData}
            </p>
            : problems.map((problem, index) => {
              const { _id: competeProblemId, problemId, maxPoint } = problem
              const { title, difficulty } = problemId
              const disabled = solveButton
              const challengeProps = {
                title,
                difficulty,
                maxPoint,
                competeProblemId,
                competeId
              }
              return (
                <Challenge key={index} {...challengeProps} competes={true} disabled={disabled} />
              )
            })
        }
      </div>
  )
}

export default CompeteProblemList
