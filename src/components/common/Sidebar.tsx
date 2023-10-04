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
import { Link, useNavigate } from 'react-router-dom'

import { authActions } from '../../store/auth/auth.slice'
import {
  boardActions,
  fetchCreateBoard,
  fetchGetAllBoards,
  fetchUpdatePositionBoards,
} from '../../store/boards/boards.slice'
import { AppDispatch, RootState } from '../../store/store'

export const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((s: RootState) => s.auth.data)
  const board = useSelector((s: RootState) => s.boards.board.item)
  const boards = useSelector((s: RootState) => s.boards.boards.items)
  const [activeIndex, setActiveIndex] = useState(0)

  // const isBoardsLoading = boards.status !== Status.LOADING
  const boardId = board?.id

  const sidebarWidth = 250

  useEffect(() => {
    dispatch(fetchGetAllBoards())
  }, [dispatch])

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === boardId)
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [boards, boardId, navigate])

  useEffect(() => {
    if (boardId) {
      navigate(`/boards/${boardId}`)
      console.log('boardId после:', boardId)
    }
  }, [boardId, navigate])

  const logout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return
    }
    const newList = [...boards]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex((e) => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(boardActions.setBoards(newList))
    dispatch(fetchUpdatePositionBoards(newList))
  }

  const addBoard = async () => {
    console.log('boardId до:', boardId)

    await dispatch(fetchCreateBoard())
  }

  console.log(boards)
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
                {boards.map((i, index) => (
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
