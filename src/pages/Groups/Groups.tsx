import { Container, Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { ReusableTable } from '../../components/ReusableTable/ReusableTable'
import { Customers } from '../../contexts/CustomersContext'
import { calculateIsAfter } from '../../utils/helpers/helperFunctions'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { RemoveGroup } from '../Dashboard/components/RemoveGroup'
import { RemoveUser } from '../Dashboard/components/RemoveUser'
import { CreateGroup } from './components/CreateGroup'
import { GroupsWrapper } from './components/GroupsWrapper'
import { SelectGroup } from './components/SelectGroup'

export const Groups = () => {
  const { getGroups, getFilteredCustomers } = useCustomers()
  const [selectedGroup, setSelectedGroup] = useState('')
  const navigate = useNavigate()

  const { data: groupsData, refetch: refetchGroups } = useQuery({
    queryKey: ['getGroups'],
    queryFn: () => getGroups(),
    refetchOnWindowFocus: false
  })

  const {
    isFetching: fetchingCustomers,
    data: filteredData,
    refetch: refetchCustomers
  } = useQuery({
    queryKey: ['getFilteredCustomers', selectedGroup],
    enabled: !!selectedGroup,
    queryFn: () => getFilteredCustomers(selectedGroup),
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
                navigate(`/customers/${cell.row.original.id}`, {
                  replace: true
                })
              }}
              color={
                calculateIsAfter(cell.row.original.next_payment_date)
                  ? 'red'
                  : 'green'
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
    <>
      <PageHeader title='Groups' />
      <GroupsWrapper>
        <Container component='main'>
          <Grid container spacing={2} display='flex' justifyContent='center'>
            <Grid xs={9} sm={3}>
              <CreateGroup />
            </Grid>
            {groupsData && groupsData.length > 0 && (
              <Grid xs={9} sm={3}>
                <SelectGroup
                  data={groupsData}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />
              </Grid>
            )}
            {selectedGroup && (
              <Grid xs={12} position='relative'>
                <RemoveGroup
                  setSelectedGroup={setSelectedGroup}
                  selectedGroup={selectedGroup}
                  refetchGroups={refetchGroups}
                />

                <ReusableTable<Customers>
                  data={filteredData || []}
                  isFetching={fetchingCustomers}
                  columns={columns}
                  title={selectedGroup || 'Select a Group for displaying table'}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </GroupsWrapper>
    </>
  )
}
