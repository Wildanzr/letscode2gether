const PopularProblem = (props) => {
  const { problems } = props
  return (
      <table className="w-full table-auto shadow-xl">
        <thead>
          <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
              NO
            </th>
            <th className="py-3 px-5 w-[85%] text-left overflow-clip whitespace-nowrap">
              NAME
            </th>
            <th className="py-3 px-5 w-[10%] text-right overflow-clip whitespace-nowrap">
              TOTAL SUBMISSIONS
            </th>
            <th className="py-3 px-5 w-[10%] text-right overflow-clip whitespace-nowrap">
              SUCCESS RATE
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-xs font-light ">
          {problems.map((problem, index) => {
            const successRate = Number(problem.rate).toFixed(2)
            return (
                <tr key={index} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
                    <td className="py-3 px-5 text-left overflow-clip">
                        <div className="flex items-center justify-start">
                        <div className="font-medium whitespace-nowrap">
                            <span className="ml-3 text-gray-600">{index + 1}</span>
                        </div>
                        </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                        <div className="flex items-center justify-start">
                        <div className="font-medium whitespace-nowrap">
                            <span className="text-gray-600">{problem.name}</span>
                        </div>
                        </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                        <div className="flex items-center justify-center">
                        <div className="font-medium whitespace-nowrap">
                            <span className="text-gray-600">{problem.submissions}</span>
                        </div>
                        </div>
                    </td>
                    <td className="py-3 px-5 text-left overflow-clip">
                        <div className="flex items-center justify-center">
                        <div className="font-medium whitespace-nowrap">
                            <span className="text-gray-600">{`${successRate}%`}</span>
                        </div>
                        </div>
                    </td>
                </tr>
            )
          })}
        </tbody>
      </table>
  )
}

export default PopularProblem
