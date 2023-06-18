import * as yup from 'yup'

export const baseSchema = yup.object().shape({
  email: yup.string().required('Email required').email('Invalid email'),
  password: yup
    .string()
    .required('Password required')
    .matches(
      /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/,
      'Invalid password'
    )
})

export const extendedSchema = baseSchema.shape({
  companyName: yup.string().required('Company name is required')
})

export const createCustomerSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  phone: yup.string().required('Phone required'),
  group: yup.string().required('Group required'),
  last_payment_date: yup.string().required('Last payment date required'),
  next_payment_date: yup.string().required('Next payment date required'),
  payment: yup.string().required('Payment required')
})
