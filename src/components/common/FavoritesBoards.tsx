import { ListItem, Box, Typography, ListItemButton } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { boardActions } from '../../store/boards/boards.slice'
import {
  favoritesActions,
  fetchGetFavorites,
  fetchUpdateFavoritesPositionBoards,
} from '../../store/favorite/favorite.slice'
import { AppDispatch, RootState } from '../../store/store'

export const FavoritesBoards = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((s: RootState) => s.favorites)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const { boardsId } = useParams<string>()

  useEffect(() => {
    dispatch(fetchGetFavorites())
  }, [])

  useEffect(() => {
    const activeItem = items.findIndex((e) => e.id === boardsId)

    setActiveIndex(activeItem)
    dispatch(boardActions.setActiveBoard(items[activeItem]))
  }, [items, boardsId, navigate])

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return
    }
    const newList = [...items]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex((e) => e.id === boardsId)
    dispatch(boardActions.setActiveBoard(newList[activeItem]))
    dispatch(favoritesActions.setFavoritesBoards(newList))
    dispatch(fetchUpdateFavoritesPositionBoards(newList))
    setActiveIndex(activeItem)
  }

  return (
    <>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={'list-board-droppable'}
          droppableId="list-board-droppable"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((i, index) => (
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
    </>
  )
}
