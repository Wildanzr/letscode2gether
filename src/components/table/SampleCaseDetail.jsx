const SampleCaseDetail = (props) => {
  const { sampleCases } = props
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
            NO
          </th>
          <th className="py-3 px-5 w-[25%] text-left overflow-clip whitespace-nowrap">
            INPUT
          </th>
          <th className="py-3 px-5 w-[25%] text-left overflow-clip whitespace-nowrap">
            OUTPUT
          </th>
          <th className="py-3 px-5 w-[45%] text-left overflow-clip whitespace-nowrap">
            EXPLANATION
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light font-code">
        {sampleCases.length > 0
          ? (
              sampleCases.map((sample, index) => {
                const { input, output, explanation } = sample

                // split input with \n
                const inputSplit = input.split('\n')
                const outputSplit = output.split('\n')

                return (
              <tr
                key={index}
                className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
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
                      {inputSplit.map((input, index) => (
                        <p key={index} className="mb-0 text-gray-600">
                          {input}
                        </p>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 text-left overflow-clip">
                  <div className="flex items-center justify-start">
                    <div className="font-medium whitespace-nowrap">
                      {outputSplit.map((output, index) => (
                        <p key={index} className="mb-0 text-gray-600">
                          {output}
                        </p>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 text-left overflow-clip">
                  <div className="flex items-center justify-start">
                    <div className="font-medium">
                      <span className="text-gray-600">{explanation}</span>
                    </div>
                  </div>
                </td>
              </tr>
                )
              })
            )
          : (
          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
            <td colSpan={5} className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="ml-3 text-gray-600">No Sample Cases</span>
                </div>
              </div>
            </td>
          </tr>
            )}
      </tbody>
    </table>
  )
}

export default SampleCaseDetail
