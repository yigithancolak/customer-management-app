import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { ReusableTable } from '../../components/ReusableTable/ReusableTable'
import { Customers } from '../../contexts/CustomersContext'
import { useCustomers } from '../../utils/hooks/useCustomers'

export const Dashboard = () => {
  const { createCustomer, getCustomers } = useCustomers()

  const { isFetching, data } = useQuery({
    queryKey: ['getCustomers'],
    queryFn: () => getCustomers(),
    refetchOnWindowFocus: false
  })

  console.log(data)

  const columns = useMemo<ColumnDef<Customers>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Phone',
        accessorKey: 'phone'
      },
      {
        header: 'Group',
        accessorKey: 'group'
      },
      {
        header: 'Last Payment',
        accessorKey: 'last_payment_date'
      },
      {
        header: 'Next Payment',
        accessorKey: 'next_payment_date'
      },
      {
        header: 'Payment',
        accessorKey: 'payment'
      }
    ],
    []
  )

  return (
    <Container component='main'>
      <PageHeader title='Dashboard' />
      <ReusableTable<Customers>
        data={data}
        isFetching={isFetching}
        title='Customers'
        columns={columns}
      />
    </Container>
  )
}
