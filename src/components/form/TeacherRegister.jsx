/* eslint-disable prefer-promise-reject-errors */
import { useGlobal } from '../../contexts/GlobalContext'
import api from '../../api'

import debounce from 'debounce-promise'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Select, DatePicker } from 'antd'

// Destructure
const { Item } = Form
const { Option } = Select

const TeacherRegister = () => {
  // Global Functions
  const { globalFunctions, globalState } = useGlobal()
  const { mySwal } = globalFunctions
  const { setTabs } = globalState

  // Navigator
  const navigate = useNavigate()

  // useForm
  const [form] = Form.useForm()

  // Custom Date Format
  const dateFormat = 'YYYY/MM/DD'

  // Finish Success
  const onFinish = async (values) => {
    const payload = {
      ...values,
      role: 1
    }

    // Show loading
    mySwal.fire({
      title: 'Registering you in...',
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Register
    try {
      const { data } = await api.post('/auth/register', payload)

      mySwal.fire({
        icon: 'success',
        title: 'Register Success',
        text: data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setTabs(0)
        navigate('/')
      })
    } catch (error) {
      console.log(error)
      // Show error message
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

  // Check userame is available
  const checkUsername = async (username) => {
    try {
      const { data } = await api.get(`/user/username?username=${username}`)
      const { isTaken } = data.data

      return isTaken
    } catch (error) {
      console.log(error)
    }
  }

  // Check email is available
  const checkEmail = async (email) => {
    try {
      const { data } = await api.get(`/user/email?email=${email}`)
      const { isTaken } = data.data

      return isTaken
    } catch (error) {
      console.log(error)
    }
  }

  // Validator for username
  const usernameValidator = debounce(async (rule, value) => {
    if (value) {
      const isTaken = await checkUsername(value)
      if (isTaken) {
        return Promise.reject('Username is taken')
      }
    }
  }, 500)

  // Validator for email
  const emailValidator = debounce(async (rule, value) => {
    if (value) {
      const isTaken = await checkEmail(value)
      if (isTaken) {
        return Promise.reject('Email is taken')
      }
    }
  }, 500)

  return (
    <Form
      name="register"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      {/* Email */}
      <Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!'
          },
          {
            type: 'email',
            message: 'Please input a valid email!'
          },
          {
            max: 50,
            message: 'Email must be at most 50 characters'
          },
          {
            validator: emailValidator
          }
        ]}
      >
        <Input placeholder="Email" />
      </Item>

      {/* Fullname */}
      <Item
        name="fullName"
        rules={[
          {
            required: true,
            message: 'Please input your full name!'
          },
          {
            max: 255,
            message: 'Full name must be at most 255 characters'
          },
          {
            min: 3,
            message: 'Full name must be at least 3 characters'
          }
        ]}
      >
        <Input placeholder="Full Name" />
      </Item>

      {/* Username */}
      <Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          },
          {
            min: 3,
            message: 'Username must be at least 3 characters'
          },
          {
            max: 20,
            message: 'Username must be at most 20 characters'
          },
          {
            pattern: /^[a-z0-9]+$/,
            message: 'Username must be lowercase and contain only letters and numbers'
          },
          {
            validator: usernameValidator
          }
        ]}
      >
        <Input placeholder="Username" />
      </Item>

      {/* Gender */}
      <Item
        name="gender"
        rules={[
          {
            required: true,
            message: 'Please select your gender'
          }
        ]}
      >
        <Select placeholder="Sex">
          <Option value={true}>Male</Option>
          <Option value={false}>Female</Option>
        </Select>
      </Item>

      {/* Birthday */}
      <Item
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: 'Please input your date of birth!'
          }
        ]}
      >
        <DatePicker
          format={dateFormat}
          placeholder="Date of Birth"
          className="w-full"
        />
      </Item>

      {/* Password */}
      <Item
        name="password"
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
        <Input.Password placeholder="Password" />
      </Item>

      {/* Confirm Password */}
      <Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              )
            }
          })
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Item>

      {/* Submit */}
      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          Register
        </button>
      </Item>

      {/* Already have an account? login */}
      <Item>
        <p className="text-center font-ubuntu text-main dark:text-snow">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </Item>
    </Form>
  )
}

export default TeacherRegister
