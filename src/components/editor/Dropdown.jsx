import { Select } from 'antd'

const { Option } = Select

const Dropdown = (props) => {
  const { options, placeholder, onChange } = props

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={(value) => onChange(value)}
    >
      {options.map((language) => {
        return (
          <Option key={language.id} value={language.id}>
            {language.label}
          </Option>
        )
      })}
    </Select>
  )
}

export default Dropdown
