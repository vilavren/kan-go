import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { Box, IconButton, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { EmojiPicker } from '../components/common/EmojiPicker'
import { Kanban } from '../components/common/Kanban'
import { Loading } from '../components/common/Loading'
import { Status } from '../interfaces/status.enum'
import {
  fetchGetOneBoard,
  fetchUpdateBoard,
  fetchDeleteOneBoard,
} from '../store/boards/boards.asyncActions'
import { boardActions } from '../store/boards/boards.slice'
import { favoritesActions } from '../store/favorite/favorite.slice'
import { sectionsActions } from '../store/sections/sections.slice'
import { AppDispatch, RootState } from '../store/store'

let timerInput: NodeJS.Timeout
const timeout: number = 500

const Board = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [icon, setIcon] = useState<string>('')
  const { board, boards } = useSelector((s: RootState) => s.boards)
  const favoritesItem = useSelector((s: RootState) => s.favorites.items)
  const { boardsId } = useParams<string>()

  useEffect(() => {
    if (boardsId) {
      dispatch(fetchGetOneBoard(boardsId))
    }
  }, [boardsId, dispatch])

  useEffect(() => {
    if (board.item?.sections) {
      dispatch(sectionsActions.setSections(board.item?.sections))
    }
  }, [board.item?.sections])

  useEffect(() => {
    if (board.item) {
      setTitle(board.item.title)
      setDescription(board.item.description)
      setIsFavorite(board.item.favorite)
      setIcon(board.item.icon)
    }
  }, [board.item])

  const updateBoard = (fieldName: string, fieldValue: string) => {
    const temp = [...boards.items]
    const index = temp.findIndex((e) => e.id === boardsId)
    temp[index] = { ...temp[index], [fieldName]: fieldValue }

    if (isFavorite) {
      const tempFavorites = [...favoritesItem]
      const favoriteIndex = tempFavorites.findIndex((e) => e.id === boardsId)
      tempFavorites[favoriteIndex] = {
        ...tempFavorites[favoriteIndex],
        [fieldName]: fieldValue,
      }
      dispatch(favoritesActions.setFavoritesBoards(tempFavorites))
    }

    dispatch(boardActions.setBoards(temp))
  }

  const onIconChange = async (newIcon: string) => {
    setIcon(newIcon)
    updateBoard('icon', newIcon)
    if (boardsId) {
      dispatch(fetchUpdateBoard({ id: boardsId, params: { icon: newIcon } }))
    }
  }

  const timerFetchUpdateBoard = async (params: {
    title?: string
    description?: string
  }) => {
    try {
      if (boardsId) {
        dispatch(fetchUpdateBoard({ id: boardsId, params }))
      }
    } catch (error) {
      alert(error)
    }
  }

  const updateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerInput)
    const newTitle = e.target.value
    setTitle(newTitle)
    updateBoard('title', newTitle)

    timerInput = setTimeout(async () => {
      await timerFetchUpdateBoard({ title: newTitle })
    }, timeout)
  }

  const updateDescription = async (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerInput)
    const newDescription = e.target.value
    setDescription(newDescription)

    timerInput = setTimeout(async () => {
      await timerFetchUpdateBoard({ description: newDescription })
    }, timeout)
  }

  const addFavorite = async () => {
    try {
      if (boardsId) {
        dispatch(
          fetchUpdateBoard({
            id: boardsId,
            params: {
              favorite: !isFavorite,
            },
          })
        )
        setIsFavorite(!isFavorite)
      }

      let tempFavorites = [...favoritesItem]
      if (isFavorite) {
        tempFavorites = tempFavorites.filter((e) => e.id !== boardsId)
      } else {
        if (board.item) {
          tempFavorites.push(board.item)
          dispatch(favoritesActions.setFavoritesBoards(tempFavorites))
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  const deleteBoard = async () => {
    if (boardsId) {
      dispatch(fetchDeleteOneBoard(boardsId))
    }
    if (isFavorite) {
      const tempFavorites = favoritesItem.filter((e) => e.id !== boardsId)
      dispatch(favoritesActions.setFavoritesBoards(tempFavorites))
    }

    const tempBoards = boards.items.filter((e) => e.id !== boardsId)
    if (tempBoards.length <= 0) {
      dispatch(boardActions.setActiveBoard(undefined))
      dispatch(sectionsActions.setSections([]))
      navigate('/boards')
    } else {
      navigate(`/boards/${tempBoards[0].id}`)
    }
    dispatch(boardActions.setBoards(tempBoards))
  }

  return (
    <>
      {board.status === Status.LOADING ? (
        <Loading fullHeight />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <IconButton onClick={addFavorite}>
              {isFavorite ? (
                <StarIcon color="warning" />
              ) : (
                <StarOutlineOutlinedIcon />
              )}
            </IconButton>

            <IconButton onClick={deleteBoard}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: '20px 20px',
            }}
          >
            <Box>
              <EmojiPicker icon={icon} onChange={onIconChange} />
              <TextField
                value={title}
                onChange={updateTitle}
                placeholder="Без названия..."
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-input': { padding: 0 },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                  '& .MuiOutlinedInput-root': {
                    fontSize: '2rem',
                    fontWeight: '700',
                  },
                }}
              />
              <TextField
                value={description}
                onChange={updateDescription}
                placeholder="Описание..."
                variant="outlined"
                multiline
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-input': { padding: 0 },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1rem',
                    padding: '10px 4px',
                  },
                }}
              />
            </Box>
            <Box>
              <Kanban />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default Board
