import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Skeleton = () => {
  return (
    <div className="flex flex-col w-full h-40 items-center justify-center p-4">
        <Spin size="default" spinning={true} indicator={antIcon} />
        <p className='text-white text-base tracking-wider'>Processing...</p>
    </div>
  )
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default Skeleton
