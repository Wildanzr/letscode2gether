import { Select } from 'antd'

const { Option } = Select

interface DropdownProps {
  options: Array<any>
  placeholder: string
  onChange: (value: any) => void
}

const Dropdown = (props: DropdownProps) => {
  const { options, placeholder, onChange } = props

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={placeholder}
      optionFilterProp="children"
      defaultValue={options[0].label}
      onChange={(value: any) => onChange(value)}
    >
      {options.map(language => {
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
