import { yupResolver } from '@hookform/resolvers/yup'
import { Check, EditCalendarOutlined, NotInterested } from '@mui/icons-material'
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  IconButton,
  TextField
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { useMutation } from '@tanstack/react-query'
import * as dayjs from 'dayjs'
import { useState } from 'react'
//@ts-ignore
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { Customers } from '../../contexts/CustomersContext'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { AppRoutes } from '../../utils/routes/appRoutes'
import { createCustomerSchema } from '../../validations/validationSchemas'

type NonNullableProperties<T> = {
  [K in keyof T as T[K] extends null ? never : K]: NonNullable<T[K]>
}

export type CreateCustomerFormProps = NonNullableProperties<
  Omit<Customers, 'created_at' | 'id' | 'user_id'>
>

export const UpdateCustomer = () => {
  const navigate = useNavigate()
  const { updateCustomer, getCustomerData } = useCustomers()
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState({
    lastPayment: false,
    nextPayment: false
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<CreateCustomerFormProps>({
    resolver: yupResolver(createCustomerSchema),
    //@ts-ignore
    defaultValues: async () => {
      const fields = await getCustomerData(id)

      return fields
    }
  })

  const { mutateAsync: editCustomer } = useMutation({
    mutationFn: async (payload: CreateCustomerFormProps) =>
      updateCustomer(id, payload),
    onError: () => toast.error('Create customer error!'),
    onSuccess: () => {
      toast.success('Customer updated')
      navigate(AppRoutes.Root)
    }
  })

  const onSubmit = (data: CreateCustomerFormProps) => {
    editCustomer({ ...data })
  }

  return (
    <>
      <PageHeader title='Update Customer' />
      <Container component='main' maxWidth='xs'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                focused
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
                    focused
                  />
                )}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                sx={{ bgcolor: 'lightgray' }}
                focused
                fullWidth
                label='Group'
                variant='outlined'
                {...register('group')}
                error={!!errors.group}
                helperText={errors.group?.message}
                InputProps={{
                  readOnly: true,
                  endAdornment: <NotInterested htmlColor='red' />
                }}
              />
            </Grid>

            <Grid xs={12}>
              {isEditing.lastPayment ? (
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
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                setIsEditing({
                                  ...isEditing,
                                  lastPayment: false
                                })
                              }
                            >
                              <Check />
                            </IconButton>
                          )
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  focused
                  fullWidth
                  label='Last Payment Date'
                  variant='outlined'
                  {...register('last_payment_date')}
                  error={!!errors.last_payment_date}
                  helperText={errors.last_payment_date?.message}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setIsEditing({ ...isEditing, lastPayment: true })
                        }
                      >
                        <EditCalendarOutlined />
                      </IconButton>
                    )
                  }}
                />
              )}
            </Grid>

            <Grid xs={12}>
              {isEditing.nextPayment ? (
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
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                setIsEditing({
                                  ...isEditing,
                                  nextPayment: false
                                })
                              }
                            >
                              <Check />
                            </IconButton>
                          )
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  focused
                  fullWidth
                  label='Next Payment Date'
                  variant='outlined'
                  {...register('next_payment_date')}
                  error={!!errors.next_payment_date}
                  helperText={errors.next_payment_date?.message}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setIsEditing({ ...isEditing, nextPayment: true })
                        }
                      >
                        <EditCalendarOutlined />
                      </IconButton>
                    )
                  }}
                />
              )}
            </Grid>

            <Grid xs={12}>
              <TextField
                focused
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
                Update Customer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}
