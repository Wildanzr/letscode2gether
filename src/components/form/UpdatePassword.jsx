/* eslint-disable prefer-promise-reject-errors */
import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import { Form, Input } from 'antd'

import api from '../../api'

import Cookies from 'js-cookie'

const { Item } = Form

const UpdatePassword = () => {
  // useForm
  const [form] = Form.useForm()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // onFinish
  const onFinish = async (payload) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingChangePassword,
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.put('/auth/change-password', payload, config)

      mySwal.fire({
        icon: 'success',
        title: langConfig.successChangePassword,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
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
      name="reset"
      form={form}
      onFinish={onFinish}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      <Item
        name="oldPassword"
        rules={[
          {
            required: true,
            message: langConfig.formPasswordRule1
          },
          {
            min: 8,
            message: langConfig.formPasswordRule2
          },
          {
            max: 50,
            message: langConfig.formPasswordRule3
          }
        ]}
      >
        <Input.Password placeholder={langConfig.formPlaceholderCurrentPassword} />
      </Item>

      <Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: langConfig.formPasswordRule1
          },
          {
            min: 8,
            message: langConfig.formPasswordRule2
          },
          {
            max: 50,
            message: langConfig.formPasswordRule3
          }
        ]}
      >
        <Input.Password placeholder={langConfig.formPlaceholderNewPassword} />
      </Item>

      <Item
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: langConfig.formPasswordRule4
          },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(langConfig.changePasswordWarn1)
            }
          })
        ]}
      >
        <Input.Password placeholder={langConfig.formPlaceholderConfirmPassword} />
      </Item>

      <Item>
        <button
          onClick={() => form.submit()}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          {langConfig.changePasswordChange}
        </button>
      </Item>
    </Form>
  )
}

export default UpdatePassword
