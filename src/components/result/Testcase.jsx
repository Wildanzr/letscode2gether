const Testcase = ({ input, output, expected, status, memory, time }) => {
  return (
    <div className="flex flex-col px-2 py-2 space-y-4 text-white w-full">
      <div className="flex flex-col w-full space-y-2">
        <p className="font-semibold text-base mb-0">Input (stdin)</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black mb-0">
          {input}
        </p>
      </div>

      <div className="flex flex-col w-full space-y-2">
        <p className="font-semibold text-base mb-0">Output (stdout)</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black mb-0">
          {output}
        </p>
      </div>

      <div className="flex flex-col w-full space-y-2">
        <p className="font-semibold text-base mb-0">Excpected Output</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black mb-0">
          {expected}
        </p>
      </div>

      <div className="flex flex-col w-full items-end justify-end">
        <div className="flex flex-row items-start justify-evenly space-x-4">
          <div className="flex flex-row gap-1">
            <p className="text-sm lg:text-base mb-0">Result:</p>
            <p className="text-sm lg:text-base font-bold mb-0">{status}</p>
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
