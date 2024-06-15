import langConfig from '../../../config/langConfig.json'
import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { AddMaterial } from '../../../components/form'

const CreateMaterialPage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminMaterial1,
      target: '/admin/manage/materials'
    },
    {
      name: langConfig.adminMaterial1a,
      target: '/admin/manage/materials/create'
    }
  ])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              {langConfig.adminMaterial}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Create Material */}
          <AddMaterial />
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default CreateMaterialPage
