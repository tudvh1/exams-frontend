import { ROUTES_SITE } from '@/config/routes'
import { MainLayout, AuthLayout, TeacherLayout } from '@/components/Layouts/Site'
import { Login, Register, Verify } from '@/pages/Site/Auth'
import { Home } from '@/pages/Site'
import {
  Dashboard,
  Classroom,
  ClassroomUpdate,
  ClassroomStudents,
  ClassroomKey,
} from '@/pages/Site/Teacher'

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
    path: ROUTES_SITE.TEACHER.HOME,
    element: <TeacherLayout />,
    children: [
      {
        path: ROUTES_SITE.TEACHER.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES_SITE.TEACHER.CLASSROOM.INDEX,
        element: <Classroom />,
      },
      {
        path: ROUTES_SITE.TEACHER.CLASSROOM.UPDATE,
        element: <ClassroomUpdate />,
      },
      {
        path: ROUTES_SITE.TEACHER.CLASSROOM.STUDENTS,
        element: <ClassroomStudents />,
      },
      {
        path: ROUTES_SITE.TEACHER.CLASSROOM.KEYS,
        element: <ClassroomKey />,
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
