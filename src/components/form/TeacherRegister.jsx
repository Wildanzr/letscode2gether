/* eslint-disable prefer-promise-reject-errors */
import langConfig from '../../config/langConfig.json'
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
  const dateFormat = 'DD/MM/YYYY'

  // Finish Success
  const onFinish = async (values) => {
    const payload = {
      ...values,
      role: 1
    }

    // Show loading
    mySwal.fire({
      title: langConfig.loadingRegister,
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
        title: langConfig.successRegister,
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
        return Promise.reject(langConfig.validateUsernameTaken)
      }
    }
  }, 500)

  // Validator for email
  const emailValidator = debounce(async (rule, value) => {
    if (value) {
      const isTaken = await checkEmail(value)
      if (isTaken) {
        return Promise.reject(langConfig.validateEmailTaken)
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
            message: langConfig.formEmailRule1
          },
          {
            type: 'email',
            message: langConfig.formEmailRule2
          },
          {
            max: 50,
            message: langConfig.formEmailRule3
          },
          {
            validator: emailValidator
          }
        ]}
      >
        <Input placeholder={langConfig.formPlaceHolderEmail} />
      </Item>

      {/* Fullname */}
      <Item
        name="fullName"
        rules={[
          {
            required: true,
            message: langConfig.formFullNameRule1
          },
          {
            max: 255,
            message: langConfig.formFullNameRule2
          },
          {
            min: 3,
            message: langConfig.formFullNameRule3
          }
        ]}
      >
        <Input placeholder={langConfig.formPlaceholderFullName} />
      </Item>

      {/* Username */}
      <Item
        name="username"
        rules={[
          {
            required: true,
            message: langConfig.formUsernameRule1
          },
          {
            min: 3,
            message: langConfig.formUsernameRule2
          },
          {
            max: 20,
            message: langConfig.formUsernameRule3
          },
          {
            pattern: /^[a-z0-9]+$/,
            message: langConfig.formUsernameRule4
          },
          {
            validator: usernameValidator
          }
        ]}
      >
        <Input placeholder={langConfig.formPlaceholderUsername} />
      </Item>

      {/* Gender */}
      <Item
        name="gender"
        rules={[
          {
            required: true,
            message: langConfig.formGenderRule1
          }
        ]}
      >
        <Select placeholder={langConfig.formPlaceholderGender} >
          <Option value={true}>{langConfig.formGenderOption1}</Option>
          <Option value={false}>{langConfig.formGenderOption2}</Option>
        </Select>
      </Item>

      {/* Birthday */}
      <Item
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: langConfig.formBirthdayRule1
          }
        ]}
      >
        <DatePicker
          format={dateFormat}
          placeholder={langConfig.formPlaceholderBirthday}
          className="w-full"
        />
      </Item>

      {/* Password */}
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

      {/* Confirm Password */}
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
        <Input.Password placeholder="Confirm Password" />
      </Item>

      {/* Submit */}
      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          {langConfig.authRegisterButton}
        </button>
      </Item>

      {/* Already have an account? login */}
      <Item>
        <p className="text-center font-ubuntu text-main dark:text-snow">
        {langConfig.authRegisterHaveAccount}
          <Link to="/auth/login" className="text-blue-500 hover:text-blue-700 pl-1">
            {langConfig.authLogin}
          </Link>
        </p>
      </Item>
    </Form>
  )
}

export default TeacherRegister
