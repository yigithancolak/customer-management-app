import { Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import * as dayjs from 'dayjs'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { ReusableTable } from '../../components/ReusableTable/ReusableTable'
import { Customers } from '../../contexts/CustomersContext'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { RemoveUser } from './components/RemoveUser'

export const Dashboard = () => {
  const { createCustomer, getCustomers } = useCustomers()
  const navigate = useNavigate()

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
        accessorKey: 'name',
        cell: (cell) => {
          const name = cell.row.original.name
          const nextPayment = cell.row.original.next_payment_date
          const isAfter = dayjs(new Date()).isAfter(dayjs(nextPayment))

          return (
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`customers/${cell.row.original.id}`)
              }}
              color={isAfter ? 'red' : 'green'}
            >
              {name}
            </Typography>
          )
        }
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
      },
      {
        header: 'Action',
        accessorKey: 'id',
        cell: (cell) => (
          <RemoveUser
            id={cell.getValue<number>()}
            name={cell.row.original.name}
          />
        )
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
