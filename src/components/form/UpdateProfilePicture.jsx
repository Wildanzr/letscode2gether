import langConfig from '../../config/langConfig.json'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import FallBack from '../../assets/fault.png'

import api from '../../api'

import Cookies from 'js-cookie'
import { Image, Upload, Button, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'

const UpdateProfilePicture = (props) => {
  // Props Destructuring
  const { picture, setFetch } = props

  // Auth Functions
  const { authFunctions } = useAuth()
  const { fetchUser } = authFunctions

  // Local States
  const [fileList, setFileList] = useState([])

  // Custom upload image request
  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options

    const fmData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    fmData.append('files', file)
    try {
      await api.post('/user/avatar', fmData, config)
      onSuccess('Ok')

      // Fetch user data
      await fetchUser()
      setFetch(true)
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }

  // Upload Configuration
  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error(langConfig.updatePictureProfileWarn1)
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error(langConfig.updatePictureProfileWarn2)
      }
      setFileList(file)
      return isJpgOrPng && isLt2M
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onPreview: async (file) => {
      let src = file.url
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj)
          reader.onload = () => resolve(reader.result)
        })
      }
      const image = new Image()
      image.src = src
      const imgWindow = window.open(src)
      imgWindow.document.write(image.outerHTML)
    },
    customRequest: uploadImage
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <div className="flex w-60 h-60 items-center justify-center ">
        <Image src={picture} className="rounded-full" fallback={FallBack} />
      </div>
      <ImgCrop rotate>
        <Upload {...uploadProps}>
          <div className="flex flex-col items-center justify-center">
            <Button icon={<UploadOutlined />}>
              {langConfig.profileUpdatePicture}
            </Button>
          </div>
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default UpdateProfilePicture
