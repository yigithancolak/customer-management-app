import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
//@ts-ignore
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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

export const CreateCustomer = () => {
  const { createCustomer, getGroups } = useCustomers()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<CreateCustomerFormProps>({
    resolver: yupResolver(createCustomerSchema)
  })

  const { data: groupsData } = useQuery({
    queryKey: ['getGroups'],
    queryFn: () => getGroups(),
    refetchOnWindowFocus: false
  })

  const { mutateAsync: addCustomer } = useMutation({
    mutationFn: async (payload: CreateCustomerFormProps) =>
      createCustomer(payload),
    onError: () => toast.error('Create customer error!'),
    onSuccess: () => {
      toast.success('Customer created')
    }
  })

  const onSubmit = (data: CreateCustomerFormProps) => {
    addCustomer({
      ...data
    })
    navigate(-1)
  }

  useEffect(() => {
    if (groupsData && groupsData.length > 0) {
      return
    }

    const navigateTimeout = setTimeout(() => {
      navigate(AppRoutes.Groups)
    }, 3000)

    return () => {
      clearTimeout(navigateTimeout)
    }
  }, [])

  if (groupsData && groupsData.length < 1) {
    return (
      <Container
        component='main'
        maxWidth='xs'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <PageHeader title='Create Customer' />
        <Typography textAlign='center'>
          Please create a group from Groups page before you create a customer.
          Redirecting to groups page
        </Typography>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <>
      <PageHeader title='Create Customer' />
      <Container component='main' maxWidth='xs'>
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
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Select a group
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  disabled={groupsData && groupsData?.length < 1}
                  label='Select a group'
                  placeholder='Select Group'
                  {...register('group')}
                  defaultValue={''}
                  error={!!errors.group}
                >
                  {groupsData?.map((group) => {
                    const { id, group_name } = group
                    return (
                      <MenuItem key={id} value={group_name || ''}>
                        {group_name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
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
                      focused={!!errors.next_payment_date}
                      color={errors.next_payment_date ? 'error' : 'primary'}
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
                      focused={!!errors.next_payment_date}
                      color={errors.next_payment_date ? 'error' : 'primary'}
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
    </>
  )
}
