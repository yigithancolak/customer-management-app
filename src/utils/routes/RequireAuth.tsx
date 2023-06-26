import { Container } from '@mui/material'
import { Navigate, useLocation } from 'react-router-dom'
import { LoadingAnimation } from '../../components/LoadingAnimation/LoadingAnimation'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './appRoutes'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps) => {
  const location = useLocation()

  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Container
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LoadingAnimation />
      </Container>
    )
  }

  if (!user) {
    return <Navigate to={AppRoutes.SignIn} state={{ from: location }} replace />
  }

  return props.children
}
