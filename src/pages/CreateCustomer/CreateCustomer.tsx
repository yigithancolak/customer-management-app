import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  TextField
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as dayjs from 'dayjs'
//@ts-ignore
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
  const queryClient = useQueryClient()

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

  const { mutateAsync: addCustomer, isLoading } = useMutation({
    mutationFn: async (payload: CreateCustomerFormProps) =>
      createCustomer(payload),
    onError: () => toast.error('Create customer error!'),
    onSuccess: () => {
      toast.success('Customer created')
      // queryClient.invalidateQueries({ queryKey: ['getCustomers'] })
    }
  })

  const onSubmit = (data: CreateCustomerFormProps) => {
    addCustomer({
      ...data
    })
    reset()
  }

  return (
    <Container component='main' maxWidth='xs'>
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
            <Controller
              name='phone'
              control={control}
              rules={{
                validate: matchIsValidTel
              }}
              render={({ field }) => (
                <MuiTelInput
                  disableFormatting
                  label={'Phone Number'}
                  fullWidth
                  {...field}
                  defaultCountry='TR'
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name='last_payment_date'
                render={({ field }) => (
                  <DateField
                    onChange={(date: string | null) => {
                      field.onChange(dayjs(date).format('MMM DD YYYY'))
                    }}
                    fullWidth
                    helperText={errors.last_payment_date?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name='next_payment_date'
                render={({ field }) => (
                  <DateField
                    onChange={(date: string | null) => {
                      field.onChange(dayjs(date).format('MMM DD YYYY'))
                    }}
                    fullWidth
                    helperText={errors.next_payment_date?.message}
                  />
                )}
              />
            </LocalizationProvider>
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
