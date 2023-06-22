import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { GroupsTypes } from '../../../contexts/CustomersContext'

interface SelectGroupProps {
  data: GroupsTypes[] | undefined
  selectedGroup: string
  setSelectedGroup: Dispatch<SetStateAction<string>>
}

export const SelectGroup = (props: SelectGroupProps) => {
  const { selectedGroup, setSelectedGroup, data } = props

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>Select Group</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={selectedGroup}
        label='Select Group'
        placeholder='Select Group'
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {data?.map((group) => {
          const { id, group_name } = group
          return (
            <MenuItem key={id} value={group_name || ''}>
              {group_name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
