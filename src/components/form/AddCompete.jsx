import langConfig from '../../config/langConfig.json'
import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { languageOptions } from '../../constants/languageOptions'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, DatePicker } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const AddCompete = () => {
  // useForm
  const [form] = Form.useForm()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [options] = useState(languageOptions.map((lang) => {
    return {
      label: lang.label,
      value: lang.label
    }
  }))

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  // Finish Success
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingCreateCompete,
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    const selected = values.languageAllowed

    // Filter languageOptions based on selected
    const languageAllowed = languageOptions
      .filter(lang => selected.includes(lang.label))
      .map(lang => lang.id)

    const payload = {
      name: values.name,
      description: values.description,
      languageAllowed,
      start: values.duration[0],
      end: values.duration[1],
      isLearnPath: false,
      isChallenge: false
    }

    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.post('/competes', payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successCreateCompete,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate(`/teacher/manage/competes/${data.data.compete._id}/edit`)
      })

      // Navigate to Edit Journey
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: error.response.data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false
      })
    }
  }

  return (
    <Form
      form={form}
      name="AddCompete"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      {/* Name */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.competeDetailName}
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: langConfig.formCompeteNameRule1
              },
              {
                max: 255,
                message: langConfig.formCompeteNameRule2
              }
            ]}
          >
            <Input placeholder={langConfig.formPlaceholderCompeteName} />
          </Item>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.competeDetailDescription}
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="description"
            className="w-full"
            rules={[
              {
                required: true,
                message: langConfig.formCompeteDescriptionRule1
              }
            ]}
          >
            <TextArea rows={5} placeholder={langConfig.formPlaceholderCompeteDescription} />
          </Item>
        </div>
      </div>

      {/* Language Allowed */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.competeDetailLanguage}
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="languageAllowed"
            className="w-full"
            rules={[
              {
                required: true,
                message: langConfig.formJourneyLanguageRule1
              },
              {
                type: 'array',
                min: 1,
                message: langConfig.formJourneyLanguageRule2
              }
            ]}
          >
            <Select
              mode="multiple"
              placeholder={langConfig.formPlaceholderJourneyLanguage}
              allowClear={true}
              className="w-full"
            >
              {options.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Item>
        </div>
      </div>

      {/* Start and End */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.competeDuration}
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="duration"
            className="w-full"
            rules={[
              {
                required: true,
                message: langConfig.formCompeteDurationRule1
              },
              {
                type: 'array',
                min: 2,
                message: langConfig.formCompeteDurationRule2
              }
            ]}
          >
            <RangePicker
              showTime
              className="w-full"
              placeholder={[
                langConfig.formPlaceholderCompeteStart,
                langConfig.formPlaceholderCompeteEnd
              ]}
            />
          </Item>
        </div>
      </div>

      {/* Buttons */}
      <Item>
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link
            to="/teacher/manage/competes"
            className="px-4 py-2 mt-4 text-sm font-medium text-center font-ubuntu tracking-wider uppercase transition-colors transform border-2 text-main dark:text-snow border-main dark:border-snow dark:hover:border-easy hover:border-easy duration-300 ease-in-out"
          >
            {langConfig.buttonCancel}
          </Link>

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            {langConfig.buttonAdd}
          </button>
        </div>
      </Item>
    </Form>
  )
}

export default AddCompete
