import { Select } from 'antd'

import { languageOptions } from '../../constants/languageOptions'

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
        optionFilterProp="children"
        defaultValue={'JavaScript (Node.js 12.14.0)'}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
        className='w-full'
    >{
      languageOptions.map(lang => {
        return (
          <Option key={lang.id} value={lang.id}>
            {lang.label}
          </Option>
        )
      })
    }
    </Select>
  )
}

export default SelectLanguage
