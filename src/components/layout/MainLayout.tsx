import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import {
  styled,
  // useTheme,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { authActions } from '../../store/auth/auth.slice'
import {
  fetchDeleteOneBoard,
  fetchUpdateBoard,
} from '../../store/boards/boards.asyncActions'
import { boardActions } from '../../store/boards/boards.slice'
import { favoritesActions } from '../../store/favorite/favorite.slice'
import { sectionsActions } from '../../store/sections/sections.slice'
import { AppDispatch, RootState } from '../../store/store'
import { NewSidebar } from '../common/NewSidebar'

const drawerWidth = 300

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  // position: 'fixed',
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
  backgroundColor: '#202020',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  // const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((s: RootState) => s.auth)
  const { board, boards } = useSelector((s: RootState) => s.boards)

  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const { boardsId: boardId } = useParams<string>()

  useEffect(() => {
    if (board.item) {
      setIsFavorite(board.item.favorite)
    }
  }, [board.item])

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

  const addFavorite = async () => {
    try {
      if (boardId) {
        dispatch(
          fetchUpdateBoard({
            id: boardId,
            params: {
              favorite: !isFavorite,
            },
          })
        )
        setIsFavorite(!isFavorite)
        if (isFavorite) {
          dispatch(favoritesActions.removeFavorite({ boardId }))
        } else {
          if (board.item) {
            dispatch(favoritesActions.addFavorite(board.item))
          }
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  const deleteBoard = async () => {
    if (boardId) {
      dispatch(fetchDeleteOneBoard(boardId))
      dispatch(boardActions.removeBoard({ boardId }))
      dispatch(sectionsActions.setSections([]))
      if (isFavorite) {
        dispatch(favoritesActions.removeFavorite({ boardId }))
      }
    }

    if (boards.items.length <= 0) {
      dispatch(boardActions.setActiveBoard(undefined))
      navigate('/boards')
    } else {
      navigate(`/boards/${boards.items[1].id}`)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar
          sx={{
            bgcolor: '#202020',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 1, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body1"
            noWrap
            component="h2"
            sx={{ flexGrow: 1, ...(openDrawer && { display: 'none' }) }}
          >
            {board.item?.title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton onClick={addFavorite}>
              {isFavorite ? (
                <StarIcon color="warning" />
              ) : (
                <StarOutlineOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              onClick={deleteBoard}
              // sx={{ ...(openDrawer && { display: 'none' }) }}
            >
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
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
            <MenuIcon />
          </IconButton>
          <Typography variant="body2" fontWeight={700}>
            {data?.name}
          </Typography>
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <NewSidebar />
      </Drawer>
      <Main open={openDrawer}>{children}</Main>
    </Box>
  )
}
