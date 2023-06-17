import { Container } from '@mui/material'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useCustomers } from '../../utils/hooks/useCustomers'

export const Dashboard = () => {
  const { createCustomer } = useCustomers()

  // createCustomer()

  return (
    <Container component='main'>
      <PageHeader title='Dashboard' />
    </Container>
  )
}
