import { Form, Input, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

// Destructure
const { Item } = Form

const Login = () => {
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
      name="login"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="flex flex-col w-full duration-300 ease-in-out"
    >
      <Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username or email!'
          },
          {
            max: 50,
            message: 'Username or email must be at most 50 characters'
          }
        ]}
      >
        <Input placeholder="Username or Email" />
      </Item>

      <Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          },
          {
            max: 50,
            message: 'Password must be at most 50 characters'
          }
        ]}
      >
        <Input.Password placeholder="Password" />
      </Item>

      {/* Remember me and forgot password in a row */}
      <div className="flex flex-row justify-between items-center w-full font-ubuntu">
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox defaultChecked={false}>
            <span className="text-main dark:text-snow duration-300 ease-in-out">
              Remember me
            </span>
          </Checkbox>
        </Item>
        <Link to="/auth/forgot">Forgot password?</Link>
      </div>

      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          Login
        </button>
      </Item>

      {/* Don't have an account? register */}
      <Item>
        <p className="text-center font-ubuntu text-main dark:text-snow">
          Don&apos;t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-blue-500 hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </Item>
    </Form>
  )
}

export default Login
