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

export const Board = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [icon, setIcon] = useState<string>('')
  const { board, boards } = useSelector((s: RootState) => s.boards)
  const favoritesItem = useSelector((s: RootState) => s.favorites.items)
  const { boardsId: boardId } = useParams<string>()

  useEffect(() => {
    if (boardId) {
      dispatch(fetchGetOneBoard(boardId))
    }
  }, [boardId, dispatch])

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

  const updateBoard = (
    boardId: string | undefined,
    fieldName: string,
    fieldValue: string
  ) => {
    if (boardId) {
      if (isFavorite) {
        dispatch(
          favoritesActions.updateBoard({
            boardId,
            fieldName,
            fieldValue,
          })
        )
      }
      dispatch(
        boardActions.updateBoard({
          boardId,
          fieldName,
          fieldValue,
        })
      )
    }
  }

  const onIconChange = async (newIcon: string) => {
    setIcon(newIcon)
    updateBoard(boardId, 'icon', newIcon)

    if (boardId) {
      dispatch(fetchUpdateBoard({ id: boardId, params: { icon: newIcon } }))
    }
  }

  const timerFetchUpdateBoard = async (params: {
    title?: string
    description?: string
  }) => {
    try {
      if (boardId) {
        dispatch(fetchUpdateBoard({ id: boardId, params }))
      }
    } catch (error) {
      alert(error)
    }
  }

  const updateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerInput)
    const newTitle = e.target.value
    setTitle(newTitle)
    updateBoard(boardId, 'title', newTitle)

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
      }

      let tempFavorites = [...favoritesItem]
      if (isFavorite) {
        tempFavorites = tempFavorites.filter((e) => e.id !== boardId)
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
    if (boardId) {
      dispatch(fetchDeleteOneBoard(boardId))
    }
    if (isFavorite) {
      const tempFavorites = favoritesItem.filter((e) => e.id !== boardId)
      dispatch(favoritesActions.setFavoritesBoards(tempFavorites))
    }

    const tempBoards = boards.items.filter((e) => e.id !== boardId)
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
