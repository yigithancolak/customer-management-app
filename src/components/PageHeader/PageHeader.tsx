import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { AppRoutes } from '../../utils/routes/appRoutes'
import { PageHeaderWrapper } from './Wrapper'

interface PageHeaderProps {
  title: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title } = props
  const { signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <PageHeaderWrapper>
      <IconButton onClick={() => navigate(AppRoutes.Root)}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant='h5'>{title}</Typography>
      <Button
        variant='outlined'
        sx={{ position: 'absolute', right: 0 }}
        endIcon={<ExitToAppIcon />}
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </PageHeaderWrapper>
  )
}
