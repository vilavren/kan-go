import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import {
  styled,
  // useTheme,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { FC, PropsWithChildren, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../../store/auth/auth.slice'
import { AppDispatch, RootState } from '../../store/store'
import { NewSidebar } from '../common/NewSidebar'

const drawerWidth = 250

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  // const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((s: RootState) => s.auth)
  const { item } = useSelector((s: RootState) => s.boards.board)

  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const logout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h2">
            {item?.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'ltr' ? <MenuIcon /> : <MenuIcon />} */}
            <MenuIcon />
          </IconButton>
          <Typography variant="body2" fontWeight={700}>
            {data?.name}
          </Typography>
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NewSidebar />
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  )
}
