import { useStateContext } from '../../contexts/ContextProvider'

import { Select } from 'antd'

import { languageOptions } from '../../constants/languageOptions'
import { defaultLanguage } from '../../constants/defaultLanguage'

const SelectLanguage = () => {
  // Global state
  const { langStates }:any = useStateContext()

  const { setIdeCode, setIdeLang } = langStates

  // Components
  const { Option } = Select

  const onChange = (value: string) => {
    changeLanguage(parseInt(value))
  }

  const changeLanguage = (value: number) => {
    // Search index of language
    const index = languageOptions.findIndex(lang => lang.id === value)

    setIdeCode(defaultLanguage[index].template)
    setIdeLang(languageOptions[index].value)
  }

  return (
    <Select
        showSearch
        optionFilterProp="children"
        defaultValue={'JavaScript (Node.js 12.14.0)'}
        onChange={onChange}
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
