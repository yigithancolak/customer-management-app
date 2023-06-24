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
import { extendedSchema } from '../../validations/validationSchemas'

interface SignUpFormProps {
  email: string
  password: string
  companyName: string
}

export const SignUp = () => {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<SignUpFormProps>({
    resolver: yupResolver(extendedSchema)
  })

  const onSubmit: SubmitHandler<SignUpFormProps> = async (userData) => {
    const { email, password, companyName } = userData

    signUp(email, password, companyName)
    navigate('/signIn')
  }

  return (
    <>
      <PasswordCheckList anchorEl={anchorEl} password={watch('password')} />
      <Container component='main' maxWidth='xs'>
        <Typography variant='h6' align='center' gutterBottom paddingY={2}>
          SIGN UP
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
              <TextField
                fullWidth
                label='Company Name'
                variant='outlined'
                {...register('companyName')}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>

            <Grid xs={12}>
              <Button fullWidth variant='outlined' type='submit'>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid xs={12}>
            <StyledLink to={AppRoutes.SignIn}>
              Have an account ? Sign in.
            </StyledLink>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
