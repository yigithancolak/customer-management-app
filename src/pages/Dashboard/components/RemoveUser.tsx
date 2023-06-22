import { PersonRemove } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCustomers } from '../../../utils/hooks/useCustomers'

interface RemoveUserProps {
  id: number
  name: string | null
  refetchCustomers: () => void
}

export const RemoveUser = (props: RemoveUserProps) => {
  const { deleteCustomer } = useCustomers()
  const { id, name, refetchCustomers } = props
  const [open, setOpen] = useState(false)

  const { mutateAsync: removeCustomer, isLoading } = useMutation({
    mutationFn: async (customerId: number) => deleteCustomer(customerId),
    onError: () => toast.error('Customer remove error'),
    onSuccess: () => {
      toast.success('Customer removed')
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
        <PersonRemove />
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
            disabled={isLoading}
            onClick={() => {
              removeCustomer(id)
              handleClose()
            }}
            autoFocus
          >
            {isLoading ? <CircularProgress size={14} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
