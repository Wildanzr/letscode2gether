import { useState, useEffect } from 'react'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, Skeleton } from 'antd'
import { Link, useParams } from 'react-router-dom'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input

const EditProblem = (props) => {
  // Destructure props
  const { children } = props

  // useParams
  const { journeyId, problemId } = useParams()

  // useForm
  const [form] = Form.useForm()

  // Local States
  const [problemDetail, setProblemDetail] = useState(null)
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
  const onFinish = (values) => {
    console.log(values)
  }

  // Get problem detail
  const getProblemDetail = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    // Get problem detail
    try {
      const { data } = await api.get(`/problems/${problemId}`, config)
      // console.log(data)
      setProblemDetail(data.data.problem)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get problem detail
  useEffect(() => {
    getProblemDetail()
  }, [])

  return (
    <>
      {problemDetail
        ? (
        <Form
          form={form}
          name="editProblem"
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
                    message: 'Please input title of problem!'
                  },
                  {
                    max: 255,
                    message: 'Title must be at most 255 characters'
                  }
                ]}
              >
                <Input placeholder="Title of problem" />
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
                    message: 'Please input description of problem!'
                  }
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder="Description of problem"
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
                    message: 'Please select difficulty of problem!'
                  }
                ]}
              >
                <Select
                  placeholder="Select difficulty of problem"
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
                        message: `Please input ${placeholder.toLowerCase()} of problem!`
                      },
                      {
                        max: 255,
                        message: `${placeholder} must be at most 255 characters`
                      }
                    ]}
                  >
                    <Input placeholder={`${placeholder} of problem`} />
                  </Item>
                </div>
              </div>
            )
          })}

          {/* Sample cases and Test cases */}
          {children}

          {/* Buttons */}
          <Item>
            <div className="flex flex-row space-x-4 w-full items-center justify-end">
              <Link
                to={`/admin/manage/journeys/${journeyId}/edit`}
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
        : (
        <Skeleton active paragraph={{ rows: 8 }} />
          )}
    </>
  )
}

export default EditProblem
