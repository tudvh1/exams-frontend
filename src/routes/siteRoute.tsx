import { ROUTES_SITE } from '@/config/routes'
import { MainLayout, AuthLayout } from '@/components/Layouts/Site'
import { Login, Register, Verify } from '@/pages/Site/Auth'
import { Home } from '@/pages/Site'

const siteRoute = [
  {
    path: ROUTES_SITE.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_SITE.HOME,
        element: <Home />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES_SITE.AUTH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES_SITE.AUTH.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES_SITE.AUTH.VERIFY,
        element: <Verify />,
      },
    ],
  },
]

export default siteRoute
