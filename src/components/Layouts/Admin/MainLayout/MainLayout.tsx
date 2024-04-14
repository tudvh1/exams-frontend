import Header from '@/components/Partials/Admin/Header'
import Sidebar from '@/components/Partials/Admin/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
