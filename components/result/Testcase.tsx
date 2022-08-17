const Testcase = () => {
  return (
    <div className="flex flex-col px-2 py-2 gap-4 text-white w-full">
      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-lg">Input (stdin)</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black">
          13
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-lg">Output (stdout)</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black">
          Tiga Belasi
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-lg">Excpected Output</p>
        <p className="w-full px-2 py-1 font-mono text-base bg-white text-black">
          Tiga Belas
        </p>
      </div>

      <div className="flex flex-col w-full items-end justify-end">
        <div className="flex flex-row items-start justify-evenly gap-4">
          <div className="flex flex-row gap-1">
            <p className="text-sm lg:text-base mb-0">Result:</p>
            <p className="text-sm lg:text-base font-bold mb-0">Accepted</p>
          </div>

          <div className="flex flex-row gap-1">
            <p className="text-sm lg:text-base mb-0">Memory:</p>
            <p className="text-sm lg:text-base font-bold mb-0">33020</p>
          </div>

          <div className="flex flex-row gap-1">
            <p className="text-sm lg:text-base mb-0">Time:</p>
            <p className="text-sm lg:text-base font-bold mb-0">0.008</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testcase
