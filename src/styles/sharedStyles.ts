import { CardContent, Menu, Popper as MuiPopper, styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  ...theme.typography.body2,
  textDecoration: 'none'
}))

export const List = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  ...theme.typography.body2,
  lineHeight: 1.8
}))

export const ListItem = styled('li', {
  shouldForwardProp: (props) => props !== 'isValid'
})<{ isValid: boolean }>(({ theme, isValid }) => ({
  position: 'relative',
  '&:before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    left: theme.spacing(-2),
    top: '50%',
    transform: 'translateY(-50%)',
    height: 8,
    width: 8,
    borderRadius: '50%',
    backgroundColor: isValid
      ? theme.palette.success.main
      : theme.palette.warning.main
  }
}))

export const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: theme.zIndex.tooltip,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: 'calc(50% - 10px)',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid rgba(0, 0, 0, 0.5)'
  }
}))

export const PassCheckContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3, 3, 3, 4)
}))

export const PopUpMenu = styled(Menu)(() => ({
  PaperProps: {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
}))
