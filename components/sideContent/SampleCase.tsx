interface SampleCaseProps {
    title: string
    input: string
    output: string
}

const SampleCase = (props: SampleCaseProps) => {
  const { title, input, output } = props
  return (
    <div className="flex flex-col py-2 w-full text-base text-white">
        <p className='mb-0 font-bold'>{title}</p>
        <p className="mb-0 text-sm" >Input (stdin)</p>
        <p className='my-1 px-2 py-2 bg-white w-full font-mono text-black'>{input}</p>
        <p className="mb-0 text-sm" >Output (stdout)</p>
        <p className='my-1 px-2 py-2 bg-white w-full font-mono text-black'>{output}</p>
      </div>
  )
}

export default SampleCase
