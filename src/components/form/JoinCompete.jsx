import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'

import { Form, Input, Button } from 'antd'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const { Item } = Form

const JoinCompete = (props) => {
  // Props destructuring
  const { competeId } = props

  // useForm
  const [form] = Form.useForm()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // onFinish handler
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Joining you in...',
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.post(`/competes/join/${competeId}`, values, config)

      mySwal.fire({
        icon: 'success',
        title: 'Joined successfully!',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate(`${competeId}/lobby`)
      })
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

    // Reset form
    form.resetFields()
  }

  return (
    <Form name="join-compete" form={form} className="w-full" onFinish={onFinish}>
      <Item
        name="key"
        rules={[
          {
            required: true,
            message: 'Please input compete key!'
          }
        ]}
      >
        <Input placeholder="Ask compete key to your teacher" />
      </Item>

      {/* Button */}
      <Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Join
        </Button>
      </Item>
    </Form>
  )
}

export default JoinCompete
