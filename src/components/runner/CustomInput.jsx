import langConfig from '../../config/langConfig.json'
import { Checkbox } from 'antd'

const CustomInput = (props) => {
  const { value, change } = props

  const onChange = (e) => {
    change(!value)
  }
  return (
    <Checkbox onChange={onChange} checked={value}>
      <span className="text-main dark:text-snow lg:text-lg duration-300 ease-in-out">
        {langConfig.collabCustomInput}
      </span>
    </Checkbox>
  )
}

export default CustomInput
