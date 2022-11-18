const PopularCompete = (props) => {
  const { competes } = props
  return (
    <table className="w-full table-auto shadow-md">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 w-[5%] text-left overflow-clip whitespace-nowrap">
            NO
          </th>
          <th className="py-3 px-5 w-[85%] text-left overflow-clip whitespace-nowrap">
            NAME
          </th>
          <th className="py-3 px-5 w-[10%] text-right overflow-clip whitespace-nowrap">
            PARTICIPANTS
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light ">
        {competes.map((compete, index) => (
            <tr key={index} className="border-b border-gray-200 bg-gray-100 hover:bg-white">
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
                  <span className="text-gray-600">{compete.name}</span>
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <span className="text-gray-600">{compete.participants}</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PopularCompete
