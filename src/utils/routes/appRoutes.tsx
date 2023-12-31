import { FunctionComponent } from 'react'
import { CreateCustomer } from '../../pages/CreateCustomer/CreateCustomer'
import { Dashboard } from '../../pages/Dashboard/Dashboard'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import { Groups } from '../../pages/Groups/Groups'
import { SignIn } from '../../pages/SignIn/SignIn'
import { SignUp } from '../../pages/SignUp/SignUp'
import { UpdateCustomer } from '../../pages/UpdateCustomer/UpdateCustomer'

interface AppRouteDefinitionProps {
  path: AppRoutes
  name: string
  element: FunctionComponent<object>
  isProtected: boolean
  signedInRedirect?: boolean
}

export enum AppRoutes {
  Groups = '/groups',
  Customer = '/customers/:id',
  CreateCustomer = '/createCustomer',
  ForgotPassword = '/forgotPassword',
  SignIn = '/signIn',
  SignUp = '/signUp',
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
    path: AppRoutes.Root,
    name: 'Dashboard',
    element: Dashboard,
    isProtected: true
  },
  {
    path: AppRoutes.CreateCustomer,
    name: 'Create Customer',
    element: CreateCustomer,
    isProtected: true
  },
  {
    path: AppRoutes.Customer,
    name: 'Customer',
    element: UpdateCustomer,
    isProtected: true
  },
  {
    path: AppRoutes.Groups,
    name: 'Groups',
    element: Groups,
    isProtected: true
  }
]
