/* eslint-disable camelcase */
import langConfig from '../../config/langConfig.json'
import { useCollab } from '../../contexts/CollabContext'
import { useGlobal } from '../../contexts/GlobalContext'

import { decode } from 'js-base64'
import { Spin } from 'antd'

const Result = (props) => {
  // Props Destructuring
  const { result } = props
  const { stdin, compile_output, expected_output, stdout, stderr, status } = result.data
  const { statusId } = result

  // Global States
  const { globalState } = useGlobal()
  const { isOnlyEditor } = globalState

  // Collab States
  const { problemStates } = useCollab()
  const { runMode } = problemStates

  const formatOutput = (str) => {
    const formatted = decode(str).replace(/\^/g, '\n')

    return (
      <>
        {formatted.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </>
    )
  }

  // Determine which error
  const determineError = (status) => {
    return status.description
  }

  const color = statusId === 1 || statusId === 2 ? 'text-yellow-400' : statusId === 3 ? 'text-green-400' : 'text-red-400'
  return (
    <div className="flex flex-col px-2 py-2 space-y-4 w-full text-snow dark:text-snow duration-300 ease-in-out">
        <div className="flex flex-col w-full space-y-2">
          <p className="font-semibold text-base mb-0">
            {langConfig.sampleCaseInput}
          </p>
          <div className={`w-full px-2 py-1 font-code text-base bg-snow dark:bg-snow mb-0 ${stdin ? 'text-black' : 'text-gray-300'}`}>
            {stdin === undefined
              ? <Spin size='small'/>
              : stdin === null
                ? langConfig.sampleCaseNoInput
                : formatOutput(stdin)
            }
          </div>
        </div>

        <div className="flex flex-col w-full space-y-2">
          <p className="font-semibold text-base mb-0">
            {langConfig.sampleCaseOutput}
          </p>
          <div className={`w-full px-2 py-1 font-code text-base bg-snow dark:bg-snow mb-0 ${stdout ? 'text-black' : 'text-gray-300'}`}>
            {stdout === undefined
              ? <Spin size='small'/>
              : stdout === null
                ? determineError(status)
                : formatOutput(stdout)
            }
          </div>
        </div>

        {runMode === 'batch' && !isOnlyEditor
          ? (
          <div className="flex flex-col w-full space-y-2">
            <p className="font-semibold text-base mb-0">
              {langConfig.sampleCaseExpected}
            </p>
            <div className="w-full px-2 py-1 font-code text-base bg-snow dark:bg-snow mb-0 text-black">
              {expected_output === undefined
                ? <Spin size='small'/>
                : expected_output === null
                  ? 'Error'
                  : formatOutput(expected_output)
              }
            </div>
          </div>
            )
          : null}

        {stderr && (
          <div className="flex flex-col w-full space-y-2">
            <p className="font-semibold text-base mb-0">
              {langConfig.sampleCaseError}
            </p>
            <div className="w-full px-2 py-1 font-code text-base bg-snow dark:bg-snow mb-0 text-black">
              {stderr === undefined
                ? <Spin size='small'/>
                : stderr === null
                  ? 'Error'
                  : formatOutput(stderr)
              }
            </div>
          </div>
        )}

      {compile_output && (
          <div className="flex flex-col w-full space-y-2">
            <p className="font-semibold text-base mb-0">
              {langConfig.sampleCompileError}
            </p>
            <div className="w-full px-2 py-1 font-code text-base bg-snow dark:bg-snow mb-0 text-black">
              {compile_output === undefined
                ? <Spin size='small'/>
                : compile_output === null
                  ? 'Error'
                  : formatOutput(compile_output)
              }
            </div>
          </div>
      )}

        <div className="flex flex-col w-full items-start justify-start">
          <div className="flex flex-row items-start justify-evenly space-x-4">
            <div className="flex flex-row gap-1">
              <p className="text-sm lg:text-base mb-0">
                {langConfig.resultResult}
              </p>
              <div className={`text-sm lg:text-base font-bold mb-0 ${color}`}>
                {status.description === undefined ? <Spin size='small'/> : status.description === null ? 'Error' : status.description}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Result
