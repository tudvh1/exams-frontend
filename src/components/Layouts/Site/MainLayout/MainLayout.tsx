import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'
import { Header, Sidebar } from '@/components/Partials/Site'

const MainLayout = () => {
  const { authToken, authProfile } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsChecking(true)

    if (!authToken) {
      navigate(ROUTES_SITE.AUTH.LOGIN)
    } else if (!authProfile) {
      return
    }

    setIsChecking(false)
  }, [authToken, authProfile])

  return (
    !isChecking && (
      <div className="bg-secondary min-h-screen dark:bg-card">
        <Header />
        <main className="fixed top-[57px] bottom-0 left-0 right-0 flex">
          <Sidebar />
          <div className="bg-background flex-1 dark:bg-secondary overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    )
  )
}

export default MainLayout
