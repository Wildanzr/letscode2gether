import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { languageOptions } from '../../constants/languageOptions'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, Skeleton } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input
const { Option } = Select

const EditJourney = (props) => {
  // Children props
  const { children } = props

  // useParams
  const { journeyId } = useParams()

  // useForm
  const [form] = Form.useForm()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [journeyDetails, setJourneyDetails] = useState(null)
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
  const onFinish = async (payload) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingUpdateJourney,
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

    // Filter languageOptions based on selected
    const selected = payload.languageAllowed
    const languageAllowed = languageOptions
      .filter(lang => selected.includes(lang.label))
      .map(lang => lang.id)

    // Modify payload
    payload.start = null
    payload.end = null
    payload.isLearnPath = true
    payload.isChallenge = false
    payload.languageAllowed = languageAllowed

    try {
      await api.put(`/competes/${journeyId}`, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successUpdateJourney,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate('/admin/manage/journeys')
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

  // Get compete detail
  const getCompeteDetail = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${journeyId}`, config)
      const { compete } = data.data

      // Transform languageAllowed
      const selected = compete.languageAllowed
      const languageAllowed = languageOptions
        .filter(lang => selected.includes(lang.id))
        .map(lang => lang.label)

      setJourneyDetails({
        ...compete, languageAllowed
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get compete detail
  useEffect(() => {
    getCompeteDetail()
  }, [])

  return (
    <>
      {journeyDetails
        ? (
        <Form
          form={form}
          name="editJourney"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={journeyDetails}
          className="flex flex-col w-full duration-300 ease-in-out"
        >
          {/* Name */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                {langConfig.editJourneyName}
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="name"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: langConfig.formJourneyNameRule1
                  },
                  {
                    max: 255,
                    message: langConfig.formJourneyNameRule2
                  }
                ]}
              >
                <Input placeholder={langConfig.formPlaceholderJourneyName} />
              </Item>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                {langConfig.editJourneyDescription}
              </p>
            </div>
            <div className="flex w-3/4">
              <Item
                name="description"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: langConfig.formJourneyDescriptionRule1
                  }
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder={langConfig.formPlaceholderJourneyDescription}
                />
              </Item>
            </div>
          </div>

          {/* Language Allowed */}
          <div className="flex flex-row w-full items-start justify-start">
            <div className="flex w-1/4">
              <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                {langConfig.editJourneyLanguage}
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
                  showSearch={true}
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

          {/* Problem List */}
          <div className="flex flex-col w-full">
            <p className="font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.editJourneyProblems}
            </p>
            {children}
          </div>
        </Form>
          )
        : (
          <Skeleton
            active
            paragraph={{ rows: 5 }}
          />
          )}
    </>
  )
}

export default EditJourney
