import TestCase from './TestCase'

const TestCaseResult = (props) => {
  // Destucture props
  const { tokens } = props
  return (
    <div className="grid auto-rows-auto grid-cols-2 md:grid-cols-4 w-full gap-2 py-2">
      {tokens.map((token, index) => <TestCase key={index} title={`Testcase ${index + 1}`} token={token} />)}
    </div>
  )
}

export default TestCaseResult
