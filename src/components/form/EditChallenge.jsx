import { useState } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, Skeleton } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input

const EditChallenge = (props) => {
  // Destructure props
  const { children, problemDetail } = props

  // useParams
  const { challengeId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // useForm
  const [form] = Form.useForm()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [otherFields] = useState([
    {
      name: 'constraint',
      placeholder: 'Constraints'
    },
    {
      name: 'inputFormat',
      placeholder: 'Input Format'
    },
    {
      name: 'outputFormat',
      placeholder: 'Output Format'
    }
  ])

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  // Finish Success
  const onFinish = async (payload) => {
    // Show loading
    mySwal.fire({
      title: 'Updating Challenge...',
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.put(`/problems/${challengeId}`, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Update challenge successfully',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate('/admin/manage/challenges')
      })
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
    <>
      {problemDetail
        ? (
        <Form
          form={form}
          name="editChallenge"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: problemDetail.title,
            description: problemDetail.description,
            difficulty: problemDetail.difficulty,
            constraint: problemDetail.constraint,
            inputFormat: problemDetail.inputFormat,
            outputFormat: problemDetail.outputFormat
          }}
          className="flex flex-col w-full duration-300 ease-in-out"
        >
          {/* Title */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                Title
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="title"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Please input title of challenge!'
                  },
                  {
                    min: 3,
                    message: 'Title must be at least 3 characters!'
                  },
                  {
                    max: 255,
                    message: 'Title must be at most 255 characters'
                  }
                ]}
              >
                <Input placeholder="Title of challenge" />
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
                    message: 'Please input description of challenge!'
                  }
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder="Description of challenge"
                  className="w-full"
                />
              </Item>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                Difficulty
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="difficulty"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Please select difficulty of challenge!'
                  }
                ]}
              >
                <Select
                  placeholder="Select difficulty of challenge"
                  className="w-full"
                >
                  <Select.Option value="1">Easy</Select.Option>
                  <Select.Option value="2">Medium</Select.Option>
                  <Select.Option value="3">Hard</Select.Option>
                </Select>
              </Item>
            </div>
          </div>

          {/* Constraints, Input Format, and Output Format */}
          {otherFields.map((field, index) => {
            const { name, placeholder } = field
            return (
              <div
                key={index}
                className="flex flex-row w-full items-start justify-start"
              >
                <div className="flex w-1/4">
                  <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                    {placeholder}
                  </p>
                </div>
                <div className="flex w-3/4">
                  <Item
                    name={name}
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: `Please input ${placeholder.toLowerCase()} of challenge!`
                      },
                      {
                        max: 255,
                        message: `${placeholder} must be at most 255 characters`
                      }
                    ]}
                  >
                    <Input placeholder={`${placeholder} of challenge`} />
                  </Item>
                </div>
              </div>
            )
          })}

          {/* Buttons */}
          <Item>
            <div className="flex flex-row space-x-4 w-full items-center justify-end">
              <Link
                to={'/admin/manage/challenges'}
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

          {/* Sample cases and Test cases */}
          {children}
        </Form>
          )
        : (
        <Skeleton active paragraph={{ rows: 8 }} />
          )}
    </>
  )
}

export default EditChallenge
