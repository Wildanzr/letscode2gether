import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

interface CustomInputProps {
  value: boolean,
  change: Function
}

const CustomInput = (props: CustomInputProps) => {
  const { value, change } = props

  const onChange = (e: CheckboxChangeEvent) => {
    change(!value)
  }
  return (
    <Checkbox onChange={onChange} checked={value}>
      <span className='text-white lg:text-lg'>Custom Input</span>
    </Checkbox>
  )
}

export default CustomInput
