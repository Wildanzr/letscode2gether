import { useState, useEffect } from 'react'

import { useCollab } from '../../contexts/CollabContext'

import { Select, Spin } from 'antd'

const { Option } = Select

const LangDropdown = (props) => {
  // Props destructure
  const { options, placeholder, onChange } = props

  // Collab states
  const { collabStates } = useCollab()
  const { language } = collabStates

  // Local states
  const [render, setRender] = useState(true)

  // Rerender component
  const rerender = async () => {
    setRender(false)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setRender(true)
  }

  // Monitor language change
  useEffect(() => {
    console.log('language change')
    rerender()
  }, [language])

  return (
    <>
        {render
          ? <Select
            showSearch
            style={{ width: 200 }}
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={(value) => onChange(value)}
            defaultValue={language}
          >
            {options.map((language) => {
              return (
                <Option key={language.id} value={language.id}>
                  {language.label}
                </Option>
              )
            })}
          </Select>
          : <Spin size='small'/>
        }
    </>
  )
}

export default LangDropdown
