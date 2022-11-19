const ProblemSpecification = (props) => {
  const { title, children } = props
  return (
    <div className="flex flex-col w-full text-sm text-white">
      <p className="mb-0 font-bold">{title}</p>
      {children}
    </div>
  )
}

export default ProblemSpecification
