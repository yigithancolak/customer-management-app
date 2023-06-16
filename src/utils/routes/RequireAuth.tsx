import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './appRoutes'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps) => {
  const location = useLocation()
  const { isLoading, accessToken } = useAuth()

  if (isLoading) {
    return <span>LOADING</span>
  }

  if (!accessToken) {
    return <Navigate to={AppRoutes.SignIn} state={{ from: location }} replace />
  }

  return props.children
}
