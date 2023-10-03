import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../../store/auth/auth.slice'
import { AppDispatch, RootState } from '../../store/store'

export const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((s: RootState) => s.auth.data)
  const sidebarWidth = 250

  const logout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open
      sx={{
        width: sidebarWidth,
        height: '100%',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: '#292929',
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {user?.name}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              Закрепленные
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              Частные
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  )
}
