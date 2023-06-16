import { useLocation } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps) => {
  const location = useLocation()

  //   if () {
  //     return <Navigate to={AppRoutes.SignIn} state={{ from: location }} replace />
  //   }

  return props.children
}
