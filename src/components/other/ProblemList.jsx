const ProblemList = (props) => {
  // Destructure props
  const { problem } = props
  const { problemId } = problem
  const { _id, title, difficulty } = problemId

  return (
    <>
      {problem
        ? (
        <li>
          <div className="flex flex-row font-ubuntu items-center">
            <div className="flex w-2/6 items-center justify-start">
              <p className="mb-0 text-sm">{title}</p>
            </div>
            <div className="flex w-2/6 justify-center lg:justify-start items-center">
              <p className={`mb-0 text-sm ${difficulty === 1 ? 'text-success' : difficulty === 2 ? 'text-medium' : 'text-hard'}`}>
                {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'}
              </p>
            </div>
            <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
              <button className="w-4/6 py-2 bg-snow text-main rounded font-medium lg:font-bold" onClick={() => console.log(_id)}>
                Solve
              </button>
            </div>
          </div>
        </li>
          )
        : null
        }
    </>
  )
}

export default ProblemList

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">Hello World</p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-success">easy</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-snow text-main rounded font-medium lg:font-bold">
//         Solved
//       </button>
//     </div>
//   </div>
// </li>

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">
//         Apakah Ini Belum Terlalu Panjang
//       </p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-medium">medium</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-medium text-main rounded font-medium lg:font-bold">
//         Try Again
//       </button>
//     </div>
//   </div>
// </li>

// <li>
//   <div className="flex flex-row font-ubuntu items-center">
//     <div className="flex w-2/6 items-center justify-start">
//       <p className="mb-0 text-sm">Introduce Myself</p>
//     </div>
//     <div className="flex w-2/6 justify-center lg:justify-start items-center">
//       <p className="mb-0 text-sm text-hard">hard</p>
//     </div>
//     <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
//       <button className="w-4/6 py-2 bg-success text-snow rounded font-medium lg:font-bold">
//         Lets Solve
//       </button>
//     </div>
//   </div>
// </li>
