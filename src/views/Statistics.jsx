import { StatDetail } from '../components/card'

const Statistics = () => {
  return (
    <div className="flex flex-col w-full">
      <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>Statistics</h3>
      <div className="flex w-full py-4 overflow-y-auto">
        <div className="flex flex-row w-full space-x-5">
            <StatDetail icon={1} title="Total Students" value="147" />
            <StatDetail icon={1} title="Total Teachers" value="14" />
            <StatDetail icon={2} title="Total Problems" value="312" />
            <StatDetail icon={3} title="Total Submissions" value="1892" />
            <StatDetail icon={4} title="Total Competes" value="54" />
        </div>
      </div>
    </div>
  )
}

export default Statistics
