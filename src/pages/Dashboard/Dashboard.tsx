import { Container } from '@mui/material'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { DatabaseTables, supabase } from '../../supabase/config/supabaseClient'

export const Dashboard = () => {
  const getCustomers = async () => {
    const { data, error } = await supabase
      .from(DatabaseTables.Customers)
      .select()
    if (data) {
      console.log(data)
    }
  }

  getCustomers()

  return (
    <Container component='main'>
      <PageHeader title='Dashboard' />
    </Container>
  )
}
