import { Groups } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TableViewIcon from '@mui/icons-material/TableView'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/hooks/useAuth'
import { AppRoutes } from '../../utils/routes/appRoutes'

export const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsOpen(open)
    }

  const buttonsList = [
    {
      text: 'Dashboard',
      icon: <TableViewIcon />,
      path: AppRoutes.Root
    },
    {
      text: 'Create Customer',
      icon: <PersonAddIcon />,
      path: AppRoutes.CreateCustomer
    },
    {
      text: 'Groups',
      icon: <Groups />,
      path: AppRoutes.Groups
    },
    {
      text: 'Sign Out',
      icon: <LogoutIcon />,
      method: () => signOut()
    }
  ]

  const MenuList = () => (
    <Box
      sx={{ width: 200, zIndex: 10 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {buttonsList.map((button, index) => {
          const { text, path, method, icon } = button
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={path ? () => navigate(path) : method}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <div style={{ zIndex: 10 }}>
      {
        <>
          <IconButton
            aria-label='delete'
            sx={{ position: 'absolute', right: 0 }}
            onClick={toggleDrawer(true)}
          >
            <MenuOpenIcon />
          </IconButton>
          <Drawer anchor='left' open={isOpen} onClose={toggleDrawer(false)}>
            <MenuList />
          </Drawer>
        </>
      }
    </div>
  )
}
