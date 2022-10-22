import { useCollab } from '../../contexts/CollabContext'

const Testcase = ({ input, output, expected, status, memory, time }) => {
  const { problemStates } = useCollab()
  const { runMode } = problemStates

  const color = status.id === 1 || status.id === 2 ? 'text-yellow-400' : status.id === 3 ? 'text-green-400' : 'text-red-400'
  return (
    <div className="flex flex-col px-2 py-2 space-y-4 text-white w-full">
      <div className="flex flex-col w-full space-y-2">
        <p className="font-semibold text-base mb-0">Input (stdin)</p>
        <p className={`w-full px-2 py-1 font-mono text-base bg-white mb-0 ${input ? 'text-black' : 'text-gray-300'}`}>
          {input || 'No Input'}
        </p>
      </div>

      <div className="flex flex-col w-full space-y-2">
        <p className="font-semibold text-base mb-0">Output (stdout)</p>
        <p className={`w-full px-2 py-1 font-mono text-base bg-white mb-0 ${output ? 'text-black' : 'text-gray-300'}`}>
          {output || 'No Output'}
        </p>
      </div>

      {runMode === 'batch' && (
        <div className="flex flex-col w-full space-y-2">
          <p className="font-semibold text-base mb-0">Excpected Output</p>
          <p className="w-full px-2 py-1 font-mono text-base bg-white text-black mb-0">
            {expected}
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

export default Testcase
