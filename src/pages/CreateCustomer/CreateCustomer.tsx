import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { Customers } from '../../contexts/CustomersContext'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { createCustomerSchema } from '../../validations/validationSchemas'

// export interface CreateCustomerFormProps {
//   name: string
//   phone: string
//   group: string
//   last_payment_date: string
//   next_payment_date: string
//   payment: string
// }

type NonNullableProperties<T> = {
  [K in keyof T as T[K] extends null ? never : K]: NonNullable<T[K]>
}

export type CreateCustomerFormProps = NonNullableProperties<
  Omit<Customers, 'created_at' | 'id' | 'user_id'>
>

export const CreateCustomer = () => {
  const navigate = useNavigate()
  const { createCustomer } = useCustomers()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
  } = useForm<CreateCustomerFormProps>({
    resolver: yupResolver(createCustomerSchema)
  })

  const onSubmit = (data: CreateCustomerFormProps) => {
    const {
      name,
      phone,
      group,
      last_payment_date,
      next_payment_date,
      payment
    } = data
    createCustomer({
      name,
      phone,
      group,
      last_payment_date,
      next_payment_date,
      payment
    })
    reset()
  }

  return (
    <Container component='main'>
      <PageHeader title='Create Customer' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              fullWidth
              label='Name'
              variant='outlined'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label='Phone'
              variant='outlined'
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label='Group'
              variant='outlined'
              {...register('group')}
              error={!!errors.group}
              helperText={errors.group?.message}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label='Last Payment Date'
              variant='outlined'
              {...register('last_payment_date')}
              error={!!errors.last_payment_date}
              helperText={errors.last_payment_date?.message}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label='Next Payment Date'
              variant='outlined'
              {...register('next_payment_date')}
              error={!!errors.next_payment_date}
              helperText={errors.next_payment_date?.message}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label='Payment'
              variant='outlined'
              {...register('payment')}
              error={!!errors.payment}
              helperText={errors.payment?.message}
            />
          </Grid>

          <Grid xs={12}>
            <Button fullWidth variant='outlined' type='submit'>
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
