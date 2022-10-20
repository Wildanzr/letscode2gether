import { Collab } from '../pages/collaboration'
import { NotFound } from '../pages/notfound'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Collab />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
