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
import { extendedSchema } from '../../validations/validationSchemas'

interface SignUpFormProps {
  email: string
  password: string
  companyName: string
}

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<SignUpFormProps>({
    resolver: yupResolver(extendedSchema)
  })

  const onSubmit: SubmitHandler<SignUpFormProps> = async (userData) => {
    const { email, password, companyName } = userData

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName
        }
      }
    })

    if (error) {
      toast.error('Signup Error')
    }

    if (data) {
      toast.success('Confirm your email and login')
      navigate('/signIn')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Typography variant='h6' align='center' gutterBottom>
        Sign Up
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
    </Container>
  )
}
