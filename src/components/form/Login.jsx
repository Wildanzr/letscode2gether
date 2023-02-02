import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../api'

import { Form, Input, Checkbox } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

// Destructure
const { Item } = Form

const Login = () => {
  // Global Functions
  const { globalState, globalFunctions } = useGlobal()
  const { setTabs } = globalState
  const { mySwal } = globalFunctions

  // Auth Functions
  const { authStates, authFunctions } = useAuth()
  const { setIsAuthenticated, setJwtToken } = authStates
  const { fetchUser } = authFunctions

  // useForm
  const [form] = Form.useForm()

  // Navigor
  const navigate = useNavigate()

  // Finish Success
  const onFinish = async (values) => {
    const payload = {
      username: values.username,
      password: values.password,
      remember: values.remember === undefined ? false : values.remember
    }

    // Show loading
    mySwal.fire({
      title: langConfig.loadingLogIn,
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Login
    try {
      const { data } = await api.post('/auth/login', payload)
      // console.log(data)

      // Set Cookies
      Cookies.set('jwtToken', data.data.accessToken, {
        expires: values.remember ? 7 : 1
      })

      // Set jwtToken to state
      setJwtToken(data.data.accessToken)
      setIsAuthenticated(true)

      // Fetch user data
      await fetchUser()

      mySwal.fire({
        icon: 'success',
        title: langConfig.successLogIn,
        text: data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setTabs(1)
        navigate('/learning-journey')
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
            message: langConfig.formUsernameOrEmailRule1
          },
          {
            max: 50,
            message: langConfig.formUsernameOrEmailRule2
          }
        ]}
      >
        <Input placeholder={langConfig.formPlaceholderUsernameOrEmail} />
      </Item>

      <Item
        name="password"
        rules={[
          {
            required: true,
            message: langConfig.formPasswordRule1
          },
          {
            max: 50,
            message: langConfig.formPasswordRule3
          }
        ]}
      >
        <Input.Password placeholder={langConfig.formPlaceholderPassword} />
      </Item>

      {/* Remember me and forgot password in a row */}
      <div className="flex flex-row justify-between items-center w-full font-ubuntu">
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox defaultChecked={false}>
            <span className="text-main dark:text-snow duration-300 ease-in-out">
              {langConfig.authLoginRemember}
            </span>
          </Checkbox>
        </Item>
        <Link to="/auth/forgot">
          {langConfig.authLoginForgot}
        </Link>
      </div>

      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          {langConfig.authLogin}
        </button>
      </Item>

      {/* Don't have an account? register */}
      <Item>
        <p className="text-center font-ubuntu text-main dark:text-snow">
          {langConfig.authLoginNotHaveAccount}
          <Link
            to="/auth/register"
            className="text-blue-500 hover:text-blue-700 pl-1"
          >
            {langConfig.authLoginRegister}
          </Link>
        </p>
      </Item>
    </Form>
  )
}

export default Login
