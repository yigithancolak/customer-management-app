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
