import TestCase from './TestCase'

const TestCaseResult = () => {
  return (
    <div className="grid auto-rows-auto grid-cols-2 md:grid-cols-4 w-full gap-2 py-2">
      <TestCase title="Test Case #1" result={true} />
      <TestCase title="Test Case #2" result={true} />
      <TestCase title="Test Case #3" result={true} />
      <TestCase title="Test Case #4" result={false} />
    </div>
  )
}

export default TestCaseResult
