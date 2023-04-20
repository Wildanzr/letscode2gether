import langConfig from '../../config/langConfig.json'
import { useState, useEffect, useRef } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, Skeleton } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

  // Local Refs
  const quillRef = useRef(null)

  // Local States
  const [quillValue, setQuillValue] = useState(problemDetail ? problemDetail.description : '')
  const [otherFields] = useState([
    {
      name: 'constraint',
      placeholder: langConfig.problemDetailConstraints
    },
    {
      name: 'inputFormat',
      placeholder: langConfig.problemDetailInputFormat
    },
    {
      name: 'outputFormat',
      placeholder: langConfig.problemDetailOutputFormat
    }
  ])

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  // Finish Success
  const onFinish = async (payload) => {
    payload = {
      ...payload,
      description: quillValue
    }

    // Check if payload have description
    if (!payload.description) {
      mySwal.fire({
        icon: 'error',
        title: langConfig.formProblemRule1,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
      return
    }

    // Show loading
    mySwal.fire({
      title: langConfig.loadingUpdateChallenge,
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
        title: langConfig.successUpdateChallenge,
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

  // Monitor problemDetail
  useEffect(() => {
    setQuillValue(problemDetail ? problemDetail.description : '')
  }, [problemDetail])

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
                    message: langConfig.formChallengeTitleRule1
                  },
                  {
                    min: 3,
                    message: langConfig.formChallengeTitleRule1
                  },
                  {
                    max: 255,
                    message: langConfig.formChallengeTitleRule1
                  }
                ]}
              >
                <Input placeholder={langConfig.formPlaceholderChallengeTitle} />
              </Item>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-row w-full items-start justify-start pb-5">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.problemDetailDescription}
              </p>
            </div>
            <div className="flex w-3/4">
            <ReactQuill
            ref={quillRef}
            className="w-full h-full bg-white"
            theme='snow'
            value={quillValue}
            onChange={setQuillValue}
            placeholder='Deskripsi permasalahan'
            modules={{
              toolbar: {
                container: [
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ align: [] }],
                  ['link'],
                  [{ color: [] }, { background: [] }],
                  [{ script: 'super' }, { script: 'sub' }]
                ]
              }
            }}
          />
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                {langConfig.problemDetailDifficulty}
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="difficulty"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: langConfig.formChallengeDifficultyRule1
                  }
                ]}
              >
                <Select
                  placeholder={langConfig.formPlaceholderChallengeDifficulty}
                  className="w-full"
                >
                  <Select.Option value={1}>
                    {langConfig.challengeLevel1}
                  </Select.Option>
                  <Select.Option value={2}>
                    {langConfig.challengeLevel2}
                  </Select.Option>
                  <Select.Option value={3}>
                    {langConfig.challengeLevel3}
                  </Select.Option>
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
                        message: `${langConfig.formConstraintsAndFormatRule1a} ${placeholder.toLowerCase()} ${langConfig.formConstraintsAndFormatRule1c}`
                      },
                      {
                        max: 1000,
                        message: `${placeholder} ${langConfig.formConstraintsAndFormatRule2}`
                      }
                    ]}
                  >
                    <TextArea
                      autoSize={{ minRows: 1, maxRows: 10 }}
                      placeholder={`${placeholder} ${langConfig.formConstraintsAndFormatRule1b}`}
                      className="w-full"
                    />
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
                {langConfig.buttonCancel}
              </Link>

              <button
                type="submit"
                className="px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
              >
                {langConfig.buttonSave}
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
