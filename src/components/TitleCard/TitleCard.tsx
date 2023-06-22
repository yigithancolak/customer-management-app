import { Typography } from '@mui/material'

interface TitleCardProps {
  title: string
}

export const TitleCard = (props: TitleCardProps) => {
  return (
    <Typography
      variant='h6'
      sx={(theme) => ({ color: theme.palette.primary.main, mb: 2 })}
      textTransform='uppercase'
    >
      {props.title}
    </Typography>
  )
}
