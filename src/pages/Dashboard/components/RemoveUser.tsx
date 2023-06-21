import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCustomers } from '../../../utils/hooks/useCustomers'

interface RemoveUserProps {
  id: number
  name: string | null
  refetchCustomers: () => void
}

export const RemoveUser = (props: RemoveUserProps) => {
  const queryClient = useQueryClient()
  const { deleteCustomer } = useCustomers()
  const { id, name, refetchCustomers } = props
  const [open, setOpen] = useState(false)

  const { mutateAsync: removeCustomer, isLoading } = useMutation({
    mutationFn: async (customerId: number) => deleteCustomer(customerId),
    onError: () => toast.error('Customer remove error'),
    onSuccess: () => {
      toast.success('Customer removed')
      // queryClient.invalidateQueries({
      //   queryKey: ['getCustomers', 'getFilteredCustomers']
      // })
      refetchCustomers()
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton size='small' onClick={handleClickOpen} color='error'>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {name} will be removed. Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              removeCustomer(id)
              handleClose()
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
