import { Checkbox } from 'antd'

const CustomInput = (props) => {
  const { value, change } = props

  const onChange = (e) => {
    change(!value)
  }
  return (
    <Checkbox onChange={onChange} checked={value}>
      <span className='text-white lg:text-lg'>Custom Input</span>
    </Checkbox>
  )
}

export default CustomInput
