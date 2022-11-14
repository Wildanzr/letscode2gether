import { Form, Input } from 'antd'
import { Link, useParams } from 'react-router-dom'

const { Item } = Form
const { TextArea } = Input

const AddTest = () => {
  // useForm
  const [form] = Form.useForm()

  // useParams
  const { journeyId, problemId } = useParams()

  // onFinish
  const onFinish = (values) => {
    console.log(values)
  }

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }

  return (
    <Form
      form={form}
      name="addTest"
      className="flex flex-col w-full"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* Input */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            Input
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="input"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Please fill the input of sample case!'
              },
              {
                max: 255,
                message: 'Input must be at most 255 characters'
              }
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Input of sample case"
              className='font-code'
              />
          </Item>
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-row w-full items-start justify-start">
        <div className="flex w-1/4">
          <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
            Output
          </p>
        </div>
        <div className="flex w-3/4">
          <Item
            name="output"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Please fill the output of sample case!'
              },
              {
                max: 255,
                message: 'Output must be at most 255 characters'
              }
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Output of sample case"
              className='font-code'
              />
          </Item>
        </div>
      </div>

      {/* Buttons */}
      <Item>
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link
            to={`/admin/manage/journeys/${journeyId}/problems/${problemId}/edit`}
            className="px-4 py-2 mt-4 text-sm font-medium text-center font-ubuntu tracking-wider uppercase transition-colors transform border-2 text-main dark:text-snow border-main dark:border-snow dark:hover:border-easy hover:border-easy duration-300 ease-in-out"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-sm font-medium text-center text-white font-ubuntu tracking-wider uppercase transition-colors duration-200 transform bg-easy hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            Create
          </button>
        </div>
      </Item>
    </Form>
  )
}

export default AddTest
