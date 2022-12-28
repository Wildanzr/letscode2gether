import langConfig from '../../config/langConfig.json'
import { Input } from 'antd'

const { TextArea } = Input

const InputArea = ({ input, setInput }) => {
  return (
    <TextArea
      rows={4}
      placeholder={langConfig.formPlaceholderCustomInput}
      value={input}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
  )
}

export default InputArea
