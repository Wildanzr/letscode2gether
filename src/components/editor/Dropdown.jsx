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
      {options.map((theme) => {
        return (
          <Option key={theme.id} value={theme.id}>
            {theme.label}
          </Option>
        )
      })}
    </Select>
  )
}

export default Dropdown
