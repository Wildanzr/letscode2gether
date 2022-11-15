import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { languageOptions } from '../../constants/languageOptions'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input
const { Option } = Select

const AddJourney = () => {
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
      title: 'Creating Learning Journey...',
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
      start: null,
      end: null,
      isLearnPath: true
    }
    console.log(payload)

    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.post('/competes', payload, config)
      console.log(data)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Learning Journey created successfully',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate(`/admin/manage/journeys/${data.data.compete._id}/edit`)
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
      name="addJourney"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      {/* Name */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            Name
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Please input name of journey!'
              },
              {
                max: 255,
                message: 'Name must be at most 255 characters'
              }
            ]}
          >
            <Input placeholder="Name of Learning Journey" />
          </Item>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            Description
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="description"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Please input description of journey!'
              }
            ]}
          >
            <TextArea rows={5} placeholder="Description of Learning Journey" />
          </Item>
        </div>
      </div>

      {/* Language Allowed */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            Language Allowed
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="languageAllowed"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Please select language allowed!'
              },
              {
                type: 'array',
                min: 1,
                message: 'Please select at least one language!'
              }
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select language allowed"
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

      {/* Buttons */}
      <Item>
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link
            to="/admin/manage/journeys"
            className="px-4 py-2 mt-4 text-sm font-medium text-center font-ubuntu tracking-wider uppercase transition-colors transform border-2 text-main dark:text-snow border-main dark:border-snow dark:hover:border-easy hover:border-easy duration-300 ease-in-out"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Item>
    </Form>
  )
}

export default AddJourney
