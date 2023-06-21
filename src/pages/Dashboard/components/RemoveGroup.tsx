import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { useCustomers } from '../../../utils/hooks/useCustomers'

interface RemoveGroupProps {
  selectedGroup: string
  refetchGroups: () => void
  setSelectedGroup: Dispatch<SetStateAction<string>>
}

export const RemoveGroup = (props: RemoveGroupProps) => {
  const { selectedGroup, refetchGroups, setSelectedGroup } = props
  const { deleteGroup } = useCustomers()

  const { mutateAsync: removeGroup, isLoading } = useMutation({
    mutationFn: async (groupName: string) => deleteGroup(groupName),
    onError: () => toast.error('Group remove error'),
    onSuccess: () => {
      toast.success('Group removed')
      refetchGroups()
      //   queryClient.invalidateQueries({
      //     queryKey: ['getFilteredCustomers', 'getGroups']
      //   })
    }
  })
  return (
    <Button
      variant='contained'
      onClick={() => {
        setSelectedGroup('')
        removeGroup(selectedGroup)
      }}
      sx={{
        position: 'absolute',
        right: 50,
        top: 10,
        fontSize: 12
      }}
      color='error'
      disabled={isLoading}
      endIcon={<Delete />}
    >
      Delete Group
    </Button>
  )
}
