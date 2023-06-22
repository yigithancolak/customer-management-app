import { Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { ReusableTable } from '../../components/ReusableTable/ReusableTable'
import { Customers } from '../../contexts/CustomersContext'
import { theme } from '../../styles/theme'
import { calculateIsAfter } from '../../utils/helpers/helperFunctions'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { RemoveUser } from './components/RemoveUser'

export const Dashboard = () => {
  const { getCustomers } = useCustomers()
  const navigate = useNavigate()

  const {
    isFetching,
    data,
    refetch: refetchCustomers
  } = useQuery({
    queryKey: ['getCustomers'],
    queryFn: () => getCustomers(),
    refetchOnWindowFocus: false
  })

  const columns = useMemo<ColumnDef<Customers>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (cell) => {
          const name = cell.row.original.name

          return (
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/customers/${cell.row.original.id}`)
              }}
              color={
                calculateIsAfter(cell.row.original.next_payment_date)
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
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
            refetchCustomers={refetchCustomers}
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
