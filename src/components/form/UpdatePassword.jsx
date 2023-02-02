/* eslint-disable prefer-promise-reject-errors */
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
      title: 'Updating your password...',
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
        title: 'Update password success!',
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
            message: 'Please input your password!'
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters'
          },
          {
            max: 50,
            message: 'Password must be at most 50 characters'
          }
        ]}
      >
        <Input.Password placeholder="Current Password" />
      </Item>

      <Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters'
          },
          {
            max: 50,
            message: 'Password must be at most 50 characters'
          }
        ]}
      >
        <Input.Password placeholder="New Password" />
      </Item>

      <Item
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              )
            }
          })
        ]}
      >
        <Input.Password placeholder="Confirm New Password" />
      </Item>

      <Item>
        <button
          onClick={() => form.submit()}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          Update Password
        </button>
      </Item>
    </Form>
  )
}

export default UpdatePassword
