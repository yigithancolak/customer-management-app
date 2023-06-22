import { Delete } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
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
  const [open, setOpen] = useState(false)

  const { mutateAsync: removeGroup, isLoading } = useMutation({
    mutationFn: async (groupName: string) => deleteGroup(groupName),
    onError: () => toast.error('Group remove error'),
    onSuccess: () => {
      toast.success('Group removed')
      refetchGroups()
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedGroup} will be removed. Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              setSelectedGroup('')
              removeGroup(selectedGroup)
              handleClose()
            }}
            autoFocus
          >
            {isLoading ? <CircularProgress size={14} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant='contained'
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          right: 10,
          top: 20,
          fontSize: 10
        }}
        color='error'
        disabled={isLoading}
        endIcon={<Delete />}
      >
        Delete Group
      </Button>
    </>
  )
}
