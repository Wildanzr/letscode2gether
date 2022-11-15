/* eslint-disable prefer-promise-reject-errors */
import { useGlobal } from '../../contexts/GlobalContext'
import api from '../../api'

import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Select, DatePicker } from 'antd'

// Destructure
const { Item } = Form
const { Option } = Select

const Register = () => {
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
      role: 0
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

  return (
    <Form
      name="register"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
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
          }
        ]}
      >
        <Input placeholder="Email" />
      </Item>

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
          }
        ]}
      >
        <Input placeholder="Username" />
      </Item>

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

export default Register
