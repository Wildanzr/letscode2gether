import { Spin } from 'antd'

const ProblemListLoading = () => {
  return (
    <li>
      <div className="flex flex-row font-ubuntu items-center">
        <div className="flex w-2/6 items-center justify-start">
          <Spin size='small'/>
        </div>
        <div className="flex w-2/6 justify-center lg:justify-start items-center">
          <Spin size='small'/>
        </div>
        <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
          <Spin size='small'/>
        </div>
      </div>
    </li>
  )
}

export default ProblemListLoading
