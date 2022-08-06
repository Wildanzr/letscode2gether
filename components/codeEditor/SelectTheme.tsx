import { useStateContext } from '../../contexts/ContextProvider'
import { Select } from 'antd'

const selectTheme = () => {
  const { states }:any = useStateContext()
  const { setColTheme } = states

  const { Option } = Select

  const onChange = (value: string) => {
    console.log('theme...', value)

    setColTheme(value)
  }

  return (
    <Select
        showSearch
        placeholder="Select theme"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
        className='w-full'
    >
      <Option value="light">Light</Option>
      <Option value="vs-dark">Dark</Option>
    </Select>
  )
}

export default selectTheme
