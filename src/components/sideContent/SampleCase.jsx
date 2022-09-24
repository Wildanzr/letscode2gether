const SampleCase = (props) => {
  const { title, input, output } = props
  return (
    <div className="flex flex-col w-full text-base">
      <p className="mb-0 font-bold">{title}</p>
      <p className="mb-0 text-sm">Input (stdin)</p>
      <p className="my-1 px-2 py-2 bg-white w-full font-mono">{input}</p>
      <p className="mb-0 text-sm">Output (stdout)</p>
      <p className="my-1 px-2 py-2 bg-white w-full font-mono">{output}</p>
    </div>
  )
}

export default SampleCase
