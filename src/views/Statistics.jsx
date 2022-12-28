import langConfig from '../config/langConfig.json'
import { StatDetail } from '../components/card'

const Statistics = () => {
  return (
    <div className="flex flex-col w-full">
      <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>
        {langConfig.dashboardStatistics}
      </h3>
      <div className="flex w-full py-4 overflow-y-auto">
        <div className="flex flex-row w-full space-x-5">
            <StatDetail icon={1} title={langConfig.totalStudents} value="19" />
            <StatDetail icon={1} title={langConfig.totalTeachers} value="4" />
            <StatDetail icon={2} title={langConfig.totalProblems} value="26" />
            <StatDetail icon={3} title={langConfig.totalSubmissions} value="231" />
            <StatDetail icon={4} title={langConfig.totalCompetes} value="5" />
        </div>
      </div>
    </div>
  )
}

export default Statistics
