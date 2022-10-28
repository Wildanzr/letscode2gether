import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'

// Destructure
const { Item } = Form

const Forgot = () => {
  const [form] = Form.useForm()

  // Finish Success
  const onFinish = (values) => {
    console.log(values)
  }

  // Finish Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }
  return (
    <Form
      name="forgot"
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

      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          Send Me A Reset Link
        </button>
      </Item>

      {/* Back to login */}
      <div className="flex flex-row justify-center items-center w-full font-ubuntu">
        <Link to="/auth/login">Back to login</Link>
      </div>
    </Form>
  )
}

export default Forgot
