/* eslint-disable prefer-promise-reject-errors */
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
    address = 'taad',
    phone = '13231',
    bio = 'adsadadasd'
  } = userDetails

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
  const dateFormat = 'YYYY/MM/DD'

  // onFinish
  const onFinish = async (values) => {
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

    console.log(payload)

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.put('/user/profile', payload, config)
      console.log(data)

      // Set fetch to true
      await fetchUser()
      setFetch(true)
    } catch (error) {
      console.log(error)
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
        return Promise.reject('Username is taken')
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
          dateOfBirth: moment(dateOfBirth, dateFormat),
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
              message:
                'Username must be lowercase and contain only letters and numbers'
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

        {/* Address */}
        <Item
          name="address"
          rules={[
            {
              required: false
            },
            {
              max: 500,
              message: 'Address must be at most 500 characters'
            },
            {
              min: 3,
              message: 'Address must be at least 3 characters'
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
              message: 'Phone must be at most 20 characters'
            },
            {
              min: 8,
              message: 'Phone must be at least 8 characters'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Phone must contain only numbers'
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
              message: 'Bio must be at most 1000 characters'
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
            Update Profile
          </button>
        </Item>
      </Form>
    </div>
  )
}

export default UpdateProfile
