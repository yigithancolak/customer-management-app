import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { AppRoutes } from '../../utils/routes/appRoutes'
import { DrawerMenu } from '../DrawerMenu/DrawerMenu'
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
      <DrawerMenu />
    </PageHeaderWrapper>
  )
}
