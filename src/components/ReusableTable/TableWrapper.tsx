import { styled } from '@mui/material'

export const TableWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  '& table': {
    borderCollapse: 'separate'
  },
  '& thead': {
    '& th': {
      textAlign: 'left',
      color: theme.palette.primary.main,
      fontWeight: 'normal',
      padding: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.background.default}`,
      fontSize: 14
    }
  },

  '& tbody tr:nth-of-type(even)': {
    '& td': {
      backgroundColor: theme.palette.grey[300]
    }
  },

  '& tbody': {
    '& td': {
      padding: theme.spacing(0, 1),
      height: 46
    }
  }
}))
