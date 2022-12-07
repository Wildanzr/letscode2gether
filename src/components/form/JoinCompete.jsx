import { Form, Input, Button } from 'antd'

const { Item } = Form

const JoinCompete = (props) => {
  // Props destructuring
  const { competeId } = props

  // useForm
  const [form] = Form.useForm()

  // onFinish handler
  const onFinish = (values) => {
    console.log('Joining compete', competeId, 'with key', values.key)

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
        <Input placeholder="Compete Key" />
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
