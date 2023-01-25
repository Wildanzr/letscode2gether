import langConfig from '../../config/langConfig.json'
import { Spin } from 'antd'

const SampleCase = (props) => {
  // Props Destructuring
  const { title, input, output, explanation } = props

  const formatOutput = (str = '') => {
    if (str === null) return null
    const formatted = str.replace(/\^/g, '\n')

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
  return (
    <div className="flex flex-col py-2 w-full text-base">
      <p className="mb-0 font-bold">{title}</p>

      <p className="mb-0 text-sm">
        {langConfig.sampleCaseInput}
      </p>
      <div className="my-1 px-2 py-2 font-code bg-white w-full text-sm text-black">
        {input === null
          ? <span className='text-gray-300'>
            {langConfig.sampleCaseNoInput}
          </span>
          : formatOutput(input) || <Spin size='small' />
        }
      </div>

      <p className="mb-0 text-sm">
        {langConfig.sampleCaseOutput}
      </p>
      <div className="my-1 px-2 py-2 bg-white w-full font-code text-sm text-black">
        {formatOutput(output) || <Spin size='small' />}
      </div>

      {explanation && (
        <>
          <p className="mb-0 text-sm">
            {langConfig.sampleCaseExplanation}
          </p>
          <div className="my-1 px-2 py-2 bg-white w-full font-code text-sm text-black">
            {formatOutput(explanation) || <Spin size='small' />}
          </div>
        </>
      )}
    </div>
  )
}

export default SampleCase
