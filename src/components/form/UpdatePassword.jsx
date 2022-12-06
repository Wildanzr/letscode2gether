/* eslint-disable prefer-promise-reject-errors */
import { Form, Input } from 'antd'

const { Item } = Form

const UpdatePassword = () => {
  // useForm
  const [form] = Form.useForm()

  // onFinish
  const onFinish = async (values) => {
    console.log(values)
  }

  return (
    <Form
      name="reset"
      form={form}
      onFinish={onFinish}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
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
