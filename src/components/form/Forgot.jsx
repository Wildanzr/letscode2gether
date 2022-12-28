import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import api from '../../api'

import { Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

// Destructure
const { Item } = Form

const Forgot = () => {
  // Global Functions
  const { globalFunctions, globalState } = useGlobal()
  const { mySwal } = globalFunctions
  const { setTabs } = globalState

  // useForm
  const [form] = Form.useForm()

  // Navigator
  const navigate = useNavigate()

  // Finish Success
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: langConfig.loadingForgotPassword,
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Forgot
    try {
      const { data } = await api.post('/auth/forgot-password', values)

      mySwal.fire({
        icon: 'success',
        title: langConfig.successForgotPassword,
        text: data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setTabs(0)
        navigate('/auth/login')
      })
    } catch (error) {
      // console.log(error)
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
            message: langConfig.formEmailRule1
          },
          {
            type: 'email',
            message: langConfig.formEmailRule2
          },
          {
            max: 50,
            message: langConfig.formEmailRule3
          }
        ]}
      >
        <Input placeholder={langConfig.formPlaceHolderEmail} />
      </Item>

      <Item>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          {langConfig.authForgot}
        </button>
      </Item>

      {/* Back to login */}
      <div className="flex flex-row justify-center items-center w-full font-ubuntu">
        <Link to="/auth/login">{langConfig.authForgotToLogin}</Link>
      </div>
    </Form>
  )
}

export default Forgot
