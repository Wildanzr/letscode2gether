const TestCaseDetail = (props) => {
  const { testCases } = props
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
            NO
          </th>
          <th className="py-3 px-5 w-[45%] text-left overflow-clip whitespace-nowrap">
            INPUT
          </th>
          <th className="py-3 px-5 w-[45%] text-left overflow-clip whitespace-nowrap">
            OUTPUT
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light font-code">
        {testCases.length > 0
          ? (
              testCases.map((sample, index) => {
                const { input, output } = sample

                // split input with \n
                const inputSplit = input === null ? null : input.split('\n')
                const outputSplit = output === null ? null : output.split('\n')
                return (
                <tr
                  key={index}
                  className="border-b border-gray-200 bg-gray-100 hover:bg-white"
                >
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
                        {inputSplit === null
                          ? <p className="mb-0 text-gray-300">No Input</p>
                          : inputSplit.map((input, index) => (
                            <p key={index} className="mb-0 text-gray-600">{input}</p>
                          ))
                        }
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-left overflow-clip">
                    <div className="flex items-center justify-start">
                      <div className="font-medium whitespace-nowrap">
                      {outputSplit === null
                        ? <p className="mb-0 text-gray-300">No Input</p>
                        : outputSplit.map((output, index) => (
                            <p key={index} className="mb-0 text-gray-600">{output}</p>
                        ))
                      }
                      </div>
                    </div>
                  </td>
                </tr>
                )
              })
            )
          : (
            <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
            <td colSpan={3} className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="ml-3 text-gray-600">No Test Cases</span>
                </div>
              </div>
            </td>
          </tr>
            )
        }
      </tbody>
    </table>
  )
}

export default TestCaseDetail
