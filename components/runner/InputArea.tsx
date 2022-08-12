import { Input } from 'antd'

const { TextArea } = Input

const InputArea = () => {
  return (
    <TextArea rows={4} placeholder="maxLength is 6" />
  )
}

export default InputArea
