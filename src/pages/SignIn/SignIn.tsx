import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PasswordCheckList } from '../../components/PasswordChecklist/PasswordChecklist'
import { StyledLink } from '../../styles/sharedStyles'
import { useAuth } from '../../utils/hooks/useAuth'
import { AppRoutes } from '../../utils/routes/appRoutes'
import { baseSchema } from '../../validations/validationSchemas'

interface SignInFormProps {
  email: string
  password: string
}

export const SignIn = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<SignInFormProps>({
    resolver: yupResolver(baseSchema)
  })

  const onSubmit: SubmitHandler<SignInFormProps> = async (userData) => {
    const { email, password } = userData

    await signIn(email, password)
    navigate(AppRoutes.Root, { replace: true })
  }

  return (
    <>
      <PasswordCheckList anchorEl={anchorEl} password={watch('password')} />

      <Container component='main' maxWidth='xs'>
        <Typography variant='h6' align='center' gutterBottom marginY={2}>
          SIGN IN
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label='Email'
                variant='outlined'
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='outlined'
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                onFocus={(e) => setAnchorEl(e.currentTarget)}
                onBlur={() => setAnchorEl(null)}
              />
            </Grid>

            <Grid xs={12}>
              <Button fullWidth variant='outlined' type='submit'>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid xs={12}>
            <StyledLink to={AppRoutes.SignUp}>
              Don't have account? Click and sign up
            </StyledLink>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
