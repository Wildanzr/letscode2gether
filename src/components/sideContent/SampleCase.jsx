import { Spin } from 'antd'

const SampleCase = (props) => {
  const { title, input, output, explanation } = props
  return (
    <div className="flex flex-col py-2 w-full text-base text-white">
      <p className="mb-0 font-bold">{title}</p>

      <p className="mb-0 text-sm">Input (stdin)</p>
      <div className="my-1 px-2 py-2 font-code bg-white w-full text-sm text-black">
        {input || <Spin size='small' />}
      </div>

      <p className="mb-0 text-sm">Output (stdout)</p>
      <div className="my-1 px-2 py-2 bg-white w-full font-code text-sm text-black">
        {output || <Spin size='small' />}
      </div>

      {explanation && (
        <>
          <p className="mb-0 text-sm">Explanation</p>
          <div className="my-1 px-2 py-2 bg-white w-full font-code text-sm text-black">
            {explanation || <Spin size='small' />}
          </div>
        </>
      )}
    </div>
  )
}

export default SampleCase
