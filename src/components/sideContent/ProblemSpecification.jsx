const ProblemSpecification = (props) => {
  const { title, content } = props
  return (
    <div className="flex flex-col w-full text-base">
      <p className="mb-0 font-bold">{title}</p>
      <p className="mb-0">{content}</p>
    </div>
  )
}

export default ProblemSpecification
