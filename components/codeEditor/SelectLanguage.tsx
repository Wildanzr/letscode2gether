import { Select } from 'antd'

const SelectLanguage = () => {
  const { Option } = Select

  const onChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }

  return (
    <Select
        showSearch
        placeholder="Select language"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
        className='w-full'
    >
      <Option value="1">C</Option>
      <Option value="2">C++</Option>
      <Option value="3">Java</Option>
      <Option value="4">JavaScript</Option>
      <Option value="5">PHP</Option>
      <Option value="6">Python</Option>
    </Select>
  )
}

export default SelectLanguage
