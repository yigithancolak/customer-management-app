import { FunctionComponent } from 'react'
import { Dashboard } from '../../pages/Dashboard/Dashboard'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import { SignIn } from '../../pages/SignIn/SignIn'
import { SignUp } from '../../pages/SignUp/SignUp'

interface AppRouteDefinitionProps {
  path: AppRoutes
  name: string
  element: FunctionComponent<object>
  isProtected: boolean
  signedInRedirect?: boolean
}

export enum AppRoutes {
  SignIn = '/signIn',
  SignUp = '/signUp',
  Dashboard = '/dashboard',
  CatchAll = '*',
  Root = '/'
}

export const AppRouteDefinitions: AppRouteDefinitionProps[] = [
  {
    path: AppRoutes.CatchAll,
    name: 'Error Page',
    element: ErrorPage,
    isProtected: false
  },
  {
    path: AppRoutes.SignIn,
    name: 'Sign In',
    element: SignIn,
    isProtected: false,
    signedInRedirect: true
  },
  {
    path: AppRoutes.SignUp,
    name: 'Sign Up',
    element: SignUp,
    isProtected: false
  },
  {
    path: AppRoutes.Dashboard,
    name: 'Dashboard',
    element: Dashboard,
    isProtected: true
  },
  {
    path: AppRoutes.Root,
    name: 'Dashboard',
    element: Dashboard,
    isProtected: true
  }
]
