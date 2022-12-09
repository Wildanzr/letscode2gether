const Time = (props) => {
  // Props Destructuring
  const { time, unit } = props
  return (
    <div className="flex flex-col space-y-1 items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-main dark:bg-snow text-snow dark:text-main">
      <p className="mb-0 text-xl lg:text-3xl font-bold ">{time}</p>
      <p className="mb-0 text-sm lg:text-lg font-medium ">{unit}</p>
    </div>
  )
}

export default Time
