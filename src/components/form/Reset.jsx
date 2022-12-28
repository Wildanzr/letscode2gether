/* eslint-disable prefer-promise-reject-errors */
import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import api from '../../api'

import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

// Destructure
const { Item } = Form

const Reset = (props) => {
  // Destrcuture props
  const { token } = props

  // Global Functions
  const { globalState, globalFunctions } = useGlobal()
  const { setTabs } = globalState
  const { mySwal } = globalFunctions

  // useForm
  const [form] = Form.useForm()

  // Navigor
  const navigate = useNavigate()

  // Finish Success
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingResetPassword,
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Reset password
    try {
      const { data } = await api.post(`/auth/reset-password?token=${token}`, values)
      // console.log(res)

      mySwal.fire({
        icon: 'success',
        title: langConfig.successResetPassword,
        text: data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setTabs(5)
        navigate('/auth/login')
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

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }
  return (
    <Form
      name="reset"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      <Item
        name="password"
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
        <Input.Password placeholder={langConfig.formPlaceholderPassword} />
      </Item>

      <Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: langConfig.formPasswordRule4
          },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('password') === value) {
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
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          {langConfig.authResetPasswordButton}
        </button>
      </Item>

    </Form>
  )
}

export default Reset
