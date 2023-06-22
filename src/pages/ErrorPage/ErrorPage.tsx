import { ScreenSearchDesktop } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../utils/routes/appRoutes'

export const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Typography variant='h1'>404</Typography>
            <Typography variant='h6'>
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button
              variant='contained'
              onClick={() => navigate(AppRoutes.Root)}
            >
              Back Home
            </Button>
          </Grid>
          <Grid
            xs={12}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <ScreenSearchDesktop fontSize='large' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
