import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { authActions } from '../../store/auth/auth.slice'
import {
  boardActions,
  fetchCreateBoard,
  fetchGetAllBoards,
  fetchUpdatePositionBoards,
} from '../../store/boards/boards.slice'
import { AppDispatch, RootState } from '../../store/store'

import { FavoritesBoards } from './FavoritesBoards'

export const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((s: RootState) => s.auth)
  const { boards } = useSelector((s: RootState) => s.boards)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const { boardsId } = useParams<string>()

  const sidebarWidth = 250

  useEffect(() => {
    dispatch(fetchGetAllBoards())
  }, [])

  useEffect(() => {
    const activeItem = boards.items.findIndex((e) => e.id === boardsId)
    if (boards.items.length > 0 && boardsId === undefined) {
      navigate(`/boards/${boards.items[0].id}`)
    }
    setActiveIndex(activeItem)
    dispatch(boardActions.setActiveBoard(boards.items[activeItem]))
  }, [boards, boardsId, navigate])

  const logout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return
    }
    const newList = [...boards.items]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex((e) => e.id === boardsId)
    dispatch(boardActions.setActiveBoard(newList[activeItem]))
    dispatch(boardActions.setBoards(newList))
    dispatch(fetchUpdatePositionBoards(newList))
    setActiveIndex(activeItem)
  }

  const addBoard = async () => {
    await dispatch(fetchCreateBoard())
  }

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open
      sx={{
        width: sidebarWidth,
        height: '100vh',
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
              {data?.name}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <FavoritesBoards />
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
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={'list-board-droppable'}
            droppableId="list-board-droppable"
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.items.map((i, index) => (
                  <Draggable key={i.id} draggableId={i.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${i.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging
                            ? 'grab'
                            : 'pointer!important',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {i.icon} {i.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  )
}
