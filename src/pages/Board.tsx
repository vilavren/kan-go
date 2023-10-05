import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Loading } from '../components/common/Loading'
import { Status } from '../interfaces/status.enum'
import { fetchGetOneBoard } from '../store/boards/boards.slice'
import { RootState } from '../store/store'

export const Board = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [sections, setSections] = useState<[] | undefined>([])
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false)
  const [icon, setIcon] = useState<string | undefined>('')
  const { board } = useSelector((s: RootState) => s.boards)
  const { boardsId } = useParams()

  useEffect(() => {
    dispatch(fetchGetOneBoard(boardsId))
    setTitle(board.item?.title)
    setDescription(board.item?.description)
    setSections(board.item?.sections)
    setIsFavorite(board.item?.favourite)
    setIcon(board.item?.icon)
  }, [boardsId, dispatch])

  useEffect(() => {
    setTitle(board.item?.title)
    setDescription(board.item?.description)
    setSections(board.item?.sections)
    setIsFavorite(board.item?.favourite)
    setIcon(board.item?.icon)
  }, [board.item])

  console.log('board.status:', board.status)
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
            <IconButton>
              {isFavorite ? <StarIcon /> : <StarOutlineOutlinedIcon />}
            </IconButton>
            {board.item?.id}
            ТУТ
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          <Box sx={{ padding: '10px 50px' }}>
            <Box>
              emoji
              <TextField
                value={title}
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
                placeholder="Описание..."
                variant="outlined"
                multiline
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-input': { padding: 0 },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                  '& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button>Добавить раздел</Button>
              <Typography variant="body2" fontWeight="700">
                разделов: {sections?.length}
              </Typography>
            </Box>
            <Divider sx={{ margin: '10px 0' }}></Divider>
          </Box>
        </>
      )}
    </>
  )
}
