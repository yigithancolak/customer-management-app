import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu } from '../DrawerMenu/DrawerMenu'
import { PageHeaderWrapper } from './Wrapper'

interface PageHeaderProps {
  title: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title } = props
  const navigate = useNavigate()

  return (
    <PageHeaderWrapper>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant='h4'>{title}</Typography>
      <DrawerMenu />
    </PageHeaderWrapper>
  )
}
