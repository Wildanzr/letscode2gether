/* eslint-disable camelcase */
import React from 'react'
import { useCollab } from '../../contexts/CollabContext'

import { decode } from 'js-base64'

const Result = (props) => {
  // Props Destructuring
  const { result } = props
  const { stdin, expected_output, stdout, status, time, memory } = result.data
  const { statusId } = result

  // Collab States
  const { problemStates } = useCollab()
  const { runMode } = problemStates

  const color = statusId === 1 || statusId === 2 ? 'text-yellow-400' : statusId === 3 ? 'text-green-400' : 'text-red-400'
  return (
    <div className="flex flex-col px-2 py-2 space-y-4 text-white w-full">
        <div className="flex flex-col w-full space-y-2">
          <p className="font-semibold text-base mb-0">Input (stdin)</p>
          <p className={`w-full px-2 py-1 font-mono text-base bg-white mb-0 ${stdin ? 'text-black' : 'text-gray-300'}`}>
            {decode(stdin) || 'No Input'}
          </p>
        </div>

        <div className="flex flex-col w-full space-y-2">
          <p className="font-semibold text-base mb-0">Output (stdout)</p>
          <p className={`w-full px-2 py-1 font-mono text-base bg-white mb-0 ${stdout ? 'text-black' : 'text-gray-300'}`}>
            {decode(stdout) || 'No Output'}
          </p>
        </div>

        {runMode === 'batch' && (
          <div className="flex flex-col w-full space-y-2">
            <p className="font-semibold text-base mb-0">Excpected Output</p>
            <p className="w-full px-2 py-1 font-mono text-base bg-white text-black mb-0">
              {decode(expected_output)}
            </p>
          </div>
        )}

        <div className="flex flex-col w-full items-end justify-end">
          <div className="flex flex-row items-start justify-evenly space-x-4">
            <div className="flex flex-row gap-1">
              <p className="text-sm lg:text-base mb-0">Result:</p>
              <p className={`text-sm lg:text-base font-bold mb-0 ${color}`}>{status.description}</p>
            </div>

            <div className="flex flex-row gap-1">
              <p className="text-sm lg:text-base mb-0">Memory:</p>
              <p className="text-sm lg:text-base font-bold mb-0">{memory}</p>
            </div>

            <div className="flex flex-row gap-1">
              <p className="text-sm lg:text-base mb-0">Time:</p>
              <p className="text-sm lg:text-base font-bold mb-0">{time}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Result
