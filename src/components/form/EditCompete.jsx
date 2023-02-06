import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { languageOptions } from '../../constants/languageOptions'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Select, Skeleton, DatePicker } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment/moment'

// Destructure Antd Components
const { Item } = Form
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const EditCompete = (props) => {
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
      title: langConfig.loadingUpdateCompete,
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    // Filter languageOptions based on selected
    const selected = payload.languageAllowed
    const languageAllowed = languageOptions
      .filter(lang => selected.includes(lang.label))
      .map(lang => lang.id)

    // Modify payload
    payload.start = payload.duration[0]
    payload.end = payload.duration[1]
    payload.isLearnPath = false
    payload.isChallenge = false
    payload.languageAllowed = languageAllowed

    // Delete duration
    delete payload.duration

    try {
      await api.put(`/competes/${journeyId}`, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successUpdateCompete,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate('/teacher/manage/competes')
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
      console.log(compete)

      // Transform languageAllowed
      const selected = compete.languageAllowed
      const languageAllowed = languageOptions
        .filter(lang => selected.includes(lang.id))
        .map(lang => lang.label)

      // Transform start and end
      const duration = [moment(compete.start), moment(compete.end)]

      setJourneyDetails({
        ...compete, languageAllowed, duration
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
          name="EditCompete"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={journeyDetails}
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
                <TextArea
                  rows={5}
                  placeholder={langConfig.formPlaceholderCompeteDescription}
                />
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
                {langConfig.buttonSave}
              </button>
            </div>
          </Item>

          {/* Problem List */}
          <div className="flex flex-col w-full">
            <p className="font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.competeDetailProblems}
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

export default EditCompete
