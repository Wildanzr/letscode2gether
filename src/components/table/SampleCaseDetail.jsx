import langConfig from '../../config/langConfig.json'

const SampleCaseDetail = (props) => {
  const { sampleCases } = props

  const formatOutput = (str) => {
    const formatted = str.replace(/\^/g, '\n')

    return (
      <>
        {formatted.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </>
    )
  }

  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
            {langConfig.tableSampleDetail1}
          </th>
          <th className="py-3 px-5 w-[25%] text-left overflow-clip whitespace-nowrap">
            {langConfig.tableSampleDetail2}
          </th>
          <th className="py-3 px-5 w-[25%] text-left overflow-clip whitespace-nowrap">
            {langConfig.tableSampleDetail3}
          </th>
          <th className="py-3 px-5 w-[45%] text-left overflow-clip whitespace-nowrap">
            {langConfig.tableSampleDetail4}
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light font-code">
        {sampleCases.length > 0
          ? (
              sampleCases.map((sample, index) => {
                const { input, output, explanation } = sample

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
                        ? <p className="mb-0 text-gray-300">
                          {langConfig.infoNoInput}
                        </p>
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
                        ? <p className="mb-0 text-gray-300">
                          {langConfig.infoNoInput}
                        </p>
                        : outputSplit.map((output, index) => (
                            <p key={index} className="mb-0 text-gray-600">{output}</p>
                        ))
                      }
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 text-left overflow-clip">
                  <div className="flex items-center justify-start">
                    <div className="font-medium">
                      <span className="text-gray-600">{
                        formatOutput(explanation)
                      }</span>
                    </div>
                  </div>
                </td>
              </tr>
                )
              })
            )
          : (
          <tr className="border-b border-gray-200 bg-gray-100 hover:bg-white">
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
