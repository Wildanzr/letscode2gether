/* eslint-disable prefer-promise-reject-errors */
import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'
import { Form, Input, Select, DatePicker } from 'antd'

import { UpdateProfilePicture } from './index'

import Cookies from 'js-cookie'
import debounce from 'debounce-promise'
import moment from 'moment/moment'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input

const UpdateProfile = (props) => {
  // Props Destructure
  const { userDetails, fetch, setFetch } = props
  const {
    username,
    avatar,
    fullName,
    gender,
    dateOfBirth,
    address,
    phone,
    bio
  } = userDetails
  console.log(dateOfBirth)

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth Functions
  const { authFunctions } = useAuth()
  const { fetchUser } = authFunctions

  // Drilling down fetch
  const fetcher = {
    fetch, setFetch
  }

  // Make duplicate of email and username to check if it is changed
  const usernameDuplicate = username

  // useForm
  const [form] = Form.useForm()

  // Custom Date Format
  const dateFormat = 'DD/MM/YYYY'

  // onFinish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingUpdateProfile,
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Create payload
    const payload = {
      email: values.email,
      username: values.username,
      fullName: values.fullName,
      gender: values.gender,
      dateOfBirth: moment(values.dateOfBirth).toDate(),
      address: values.address,
      phone: values.phone,
      bio: values.bio
    }

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.put('/user/profile', payload, config)
      // console.log(data)

      mySwal.fire({
        icon: 'success',
        title: langConfig.successUpdateProfile,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      })

      // Set fetch to true
      await fetchUser()
      setFetch(true)
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

  // Validator for username
  const usernameValidator = debounce(async (rule, value) => {
    if (value === usernameDuplicate) {
      return Promise.resolve()
    } else {
      const isTaken = await checkUsername(value)
      if (isTaken) {
        return Promise.reject(langConfig.validateUsernameTaken)
      }
    }
  }, 500)

  return (
    <div className="flex flex-col w-full space-y-4">
      <UpdateProfilePicture picture={avatar} {...fetcher} />

      <Form
        name="update-profile"
        form={form}
        className="w-full"
        onFinish={onFinish}
        initialValues={{
          fullName,
          username,
          gender,
          dateOfBirth: moment(dateOfBirth),
          address,
          phone,
          bio
        }}
      >
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
          <Input placeholder="Full Name" />
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
          <Input placeholder="Username" />
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
          <Select placeholder="Sex">
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
            placeholder="Date of Birth"
            className="w-full"
          />
        </Item>

        {/* Address */}
        <Item
          name="address"
          rules={[
            {
              required: false
            },
            {
              max: 500,
              message: langConfig.formAddressRule1
            },
            {
              min: 3,
              message: langConfig.formAddressRule2
            }
          ]}
        >
          {/* min rows 1 max 3 */}
          <TextArea
            placeholder="Address"
            autoSize={{ minRows: 1, maxRows: 2 }}
          />
        </Item>

        {/* Phone */}
        <Item
          name="phone"
          rules={[
            {
              required: false
            },
            {
              max: 20,
              message: langConfig.formPhoneRule1
            },
            {
              min: 8,
              message: langConfig.formPhoneRule2
            },
            {
              pattern: /^[0-9]+$/,
              message: langConfig.formPhoneRule3
            }
          ]}
        >
          <Input placeholder="Phone" />
        </Item>

        {/* Bio */}
        <Item
          name="bio"
          rules={[
            {
              max: 1000,
              message: langConfig.formBioRule1
            }
          ]}
        >
          <TextArea placeholder="Bio" autoSize={{ minRows: 3, maxRows: 4 }} />
        </Item>

        {/* Submit */}
        <Item>
          <button
            onClick={() => form.submit()}
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            {langConfig.updateProfileUpdate}
          </button>
        </Item>
      </Form>
    </div>
  )
}

export default UpdateProfile
