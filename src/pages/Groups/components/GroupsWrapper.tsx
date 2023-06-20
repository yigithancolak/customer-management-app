import { Container, styled } from '@mui/material'

export const GroupsWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(4)
}))

export const CreateGroupWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}))
