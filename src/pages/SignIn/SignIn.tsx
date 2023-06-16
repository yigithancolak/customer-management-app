import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  TextField,
  Typography
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '../../supabase/config/supabaseClient'
import { baseSchema } from '../../validations/validationSchemas'

interface SignInFormProps {
  email: string
  password: string
}

export const SignIn = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<SignInFormProps>({
    resolver: yupResolver(baseSchema)
  })

  const onSubmit: SubmitHandler<SignInFormProps> = async (userData) => {
    const { email, password } = userData

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Sign In Error')
    }

    if (data) {
      toast.success('Login successful')
      navigate('/', { replace: true })
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Typography variant='h6' align='center' gutterBottom>
        Sign In
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
            />
          </Grid>

          <Grid xs={12}>
            <Button fullWidth variant='outlined' type='submit'>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
