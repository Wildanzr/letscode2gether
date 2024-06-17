import langConfig from '../../config/langConfig.json'
import { useState, useRef, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Skeleton } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Destructure Antd Components
const { Item } = Form

const EditMaterial = (props) => {
  // Destructure props
  const { materialDetail } = props

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
  const [quillValue, setQuillValue] = useState(materialDetail.content || '')

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
      title: langConfig.loadingUpdateMaterial,
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
      await api.put(`/materials/${materialDetail._id}`, payload, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: langConfig.successUpdateMaterial,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate('/admin/manage/materials')
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

  // Monitor materialDetail
  useEffect(() => {
    setQuillValue(materialDetail ? materialDetail.content : '')
  }, [materialDetail])

  return (
    <>
      {materialDetail
        ? (
        <Form
          form={form}
          name="editMaterial"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: materialDetail.title,
            content: materialDetail.content
          }}
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

          {/* Content */}
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
                {langConfig.buttonSave}
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

export default EditMaterial
