import { BsTrophy } from 'react-icons/bs'

const StatDetail = (props) => {
  const { icon, title, value } = props
  return (
    <div className="flex flex-row items-center space-x-2 bg-floor dark:bg-snow w-64 px-4 py-2 rounded-xl duration-300 ease-in-out">
        {icon === 1 && <BsTrophy className="h-8 w-8 fill-snow dark:fill-main duration-300 ease-in-out" />}
        <div className="flex flex-col">
            <h3 className="mb-0 font-ubuntu text-snow dark:text-main text-sm font-light duration-300 ease-in-out whitespace-nowrap">{title}</h3>
            <span className="mb-0 font-ubuntu text-snow dark:text-main text-base font-medium duration-300 ease-in-out">{value}</span>
        </div>
    </div>
  )
}

export default StatDetail
