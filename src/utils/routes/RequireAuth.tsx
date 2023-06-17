import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './appRoutes'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps) => {
  const location = useLocation()

  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <span>LOADING</span>
  }

  if (!user) {
    return <Navigate to={AppRoutes.SignIn} state={{ from: location }} replace />
  }

  return props.children
}
