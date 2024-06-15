import langConfig from '../../config/langConfig.json'
import { useState, useRef } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Destructure Antd Components
const { Item } = Form

const AddMaterial = () => {
  // useSearchParams
  const [searchParams] = useSearchParams()
  const journeyId = searchParams.get('cpId')

  // useForm
  const [form] = Form.useForm()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [quillValue, setQuillValue] = useState('')

  // Local Refs
  const quillRef = useRef(null)

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  // Finish Success
  const onFinish = async (payload) => {
    payload = {
      ...payload,
      content: quillValue
    }

    // Check if payload have description
    if (!payload.content) {
      mySwal.fire({
        icon: 'error',
        title: langConfig.formMaterialRule1,
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
      title: langConfig.loadingCreateChallenge,
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    // Create Problem
    try {
      const { data } = await api.post('/problems', payload, config)
      // console.log(data)
      const problemId = data.data.problem._id

      payload = {
        problemId,
        maxPoint: 100
      }

      // Add Problem to Journey
      await api.post(`/competes/${journeyId}/problems`, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successCreateChallenge,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate(`/admin/manage/challenges/${journeyId}/problems/${problemId}/edit`)
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
    <Form
      form={form}
      name="addMaterial"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      {/* Title */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.materialName}
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="title"
            className="w-full"
            rules={[
              {
                required: true,
                message: langConfig.formMaterialTitleRule1
              },
              {
                min: 3,
                message: langConfig.formMaterialTitleRule2
              },
              {
                max: 255,
                message: langConfig.formMaterialTitleRule3
              }
            ]}
          >
            <Input placeholder={langConfig.formPlaceholderMaterialTitle} />
          </Item>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-row w-full items-start justify-start pb-5">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            {langConfig.materialContent}
          </p>
        </div>
        <div className="flex w-3/4">
        <ReactQuill
            ref={quillRef}
            className="w-full h-full bg-white"
            theme='snow'
            value={quillValue}
            onChange={setQuillValue}
            placeholder='Isi materi'
            modules={{
              toolbar: {
                container: [
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ align: [] }],
                  ['link', 'image'],
                  [{ color: [] }, { background: [] }],
                  [{ script: 'super' }, { script: 'sub' }]
                ]
              }
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <Item>
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link
            to={'/admin/manage/materials'}
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

export default AddMaterial
