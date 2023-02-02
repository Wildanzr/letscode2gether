import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Skeleton } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'

const { Item } = Form
const { TextArea } = Input

const AddSample = (props) => {
  // Props destructuring
  const { competes } = props

  // useForm
  const [form] = Form.useForm()

  // useParams
  const { journeyId, problemId, competeId, challengeId, testId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [testCase, setTestCase] = useState(null)

  // onFinish
  const onFinish = async (payload) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingUpdateTestcase,
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

    // Update Test Case
    try {
      const path = journeyId === undefined
        ? `/problems/${challengeId}/test-cases/${testId}`
        : `/problems/${problemId}/test-cases/${testId}`

      await api.put(path, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successUpdateTestcase,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        const path = journeyId === undefined
          ? `/admin/manage/challenges/${competeId}/problems/${challengeId}/edit`
          : competes
            ? `/teacher/manage/competes/${journeyId}/problems/${problemId}/edit`
            : `/admin/manage/journeys/${journeyId}/problems/${problemId}/edit`

        navigate(path)
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

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  // Get Sample Case Detail
  const getTestCaseDetail = async () => {
    // Configuration
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const path = journeyId === undefined
        ? `/problems/${challengeId}/test-cases/${testId}`
        : `/problems/${problemId}/test-cases/${testId}`

      const { data } = await api.get(path, config)

      // console.log(data)
      setTestCase(data.data.testCase)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get sample case detail
  useEffect(() => {
    getTestCaseDetail()
  }, [])

  return (
    <>
      {testCase
        ? (
          <Form
          form={form}
          name="editTest"
          className="flex flex-col w-full"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            input: testCase.input,
            output: testCase.output
          }}
        >
          {/* Input */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.testCaseInput}
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="input"
                className="w-full"
                rules={[
                  {
                    max: 1000,
                    message: langConfig.formInputRule1
                  }
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder={langConfig.formPlaceholderInput}
                  className="font-code"
                />
              </Item>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.testCaseOutput}
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="output"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: langConfig.formOutputRule1
                  },
                  {
                    max: 1000,
                    message: langConfig.formOutputRule2
                  }
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder={langConfig.formPlaceholderOutput}
                  className="font-code"
                />
              </Item>
            </div>
          </div>

          {/* Buttons */}
          <Item>
            <div className="flex flex-row space-x-4 w-full items-center justify-end">
              <Link
                to={
                  journeyId === undefined
                    ? `/admin/manage/challenges/${competeId}/problems/${challengeId}/edit`
                    : competes
                      ? `/teacher/manage/competes/${journeyId}/problems/${problemId}/edit`
                      : `/admin/manage/journeys/${journeyId}/problems/${problemId}/edit`
                }
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
        </Form>
          )
        : (
            <Skeleton active paragraph={{ rows: 4 }} />
          )}
    </>
  )
}

export default AddSample
