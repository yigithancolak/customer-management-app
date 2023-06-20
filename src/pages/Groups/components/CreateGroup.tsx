import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Unstable_Grid2 as Grid, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCustomers } from '../../../utils/hooks/useCustomers'
import { createGroupSchema } from '../../../validations/validationSchemas'
import { CreateGroupWrapper } from './GroupsWrapper'

interface CreateGroupFormTypes {
  group_name: string
}

export const CreateGroup = () => {
  const { createGroup } = useCustomers()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreateGroupFormTypes>({
    resolver: yupResolver(createGroupSchema)
  })

  const { mutateAsync: addGroup, isLoading } = useMutation({
    mutationFn: async (group_name: string) => createGroup(group_name),
    onError: () => toast.error('Create group error!'),
    onSuccess: () => {
      toast.success('Group created')
      queryClient.invalidateQueries({ queryKey: ['getGroups'] })
    }
  })

  const onSubmit = (data: CreateGroupFormTypes) => {
    const { group_name } = data
    addGroup(group_name)
  }

  return (
    <CreateGroupWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={12}>
            <TextField
              {...register('group_name')}
              error={!!errors.group_name}
              helperText={errors.group_name?.message}
              variant='outlined'
              label='Group Name'
              InputProps={{
                endAdornment: <Button type='submit'>Create</Button>
              }}
            />
          </Grid>
        </Grid>
      </form>
    </CreateGroupWrapper>
  )
}
