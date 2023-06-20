import { Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useCustomers } from '../../utils/hooks/useCustomers'
import { CreateGroup } from './components/CreateGroup'
import { GroupsWrapper } from './components/GroupsWrapper'

export const Groups = () => {
  const { getGroups } = useCustomers()

  const { isFetching, data } = useQuery({
    queryKey: ['getGroups'],
    queryFn: () => getGroups(),
    refetchOnWindowFocus: false
  })

  if (isFetching) {
    return <Typography>Fetching</Typography>
  }

  return (
    <GroupsWrapper>
      <PageHeader title='Groups' />
      <Container component='main'>
        <CreateGroup />
        {data?.map((group) => (
          <Typography key={group.id}>{group.group_name}</Typography>
        ))}

        {/* <ReusableTable<Customers>
        data={data}
        isFetching={isFetching}
        title='Customers'
        columns={columns}
      /> */}
      </Container>
    </GroupsWrapper>
  )
}
