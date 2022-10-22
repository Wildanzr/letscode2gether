import { Input } from 'antd'

const { TextArea } = Input

const InputArea = ({ input, setInput }) => {
  return (
    <TextArea
      rows={4}
      placeholder="maxLength is 6"
      value={input}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
  )
}

export default InputArea
