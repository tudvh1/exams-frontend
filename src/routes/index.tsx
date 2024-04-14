import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES_ADMIN } from '@/config/routes'

const MainLayout = lazy(() => import('@/components/Layouts/Admin/MainLayout'))
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_ADMIN.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
])

export function Routes() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
