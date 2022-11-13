const Description = (props) => {
  const { title, value } = props
  return (
    <div className="flex flex-row w-full items-start justify-start">
      <div className="flex w-1/4">
        <p className="mb-0 font-medium text-base">{title}</p>
      </div>
      <div className="flex w-3/4">
        <p className="mb-0 font-light text-sm text-justify">
          {value}
        </p>
      </div>
    </div>
  )
}

export default Description
