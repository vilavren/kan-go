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
import { useParams } from 'react-router-dom'

import { EmojiPicker } from '../components/common/EmojiPicker'
import { Loading } from '../components/common/Loading'
import { Status } from '../interfaces/status.enum'
import { fetchGetOneBoard } from '../store/boards/boards.slice'
import { AppDispatch, RootState } from '../store/store'

export const Board = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [sections, setSections] = useState<[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [icon, setIcon] = useState<string>('')
  const { board } = useSelector((s: RootState) => s.boards)
  // const { favorite } = useSelector((s: RootState) => s)
  const { boardsId } = useParams<string>()

  useEffect(() => {
    if (boardsId) {
      dispatch(fetchGetOneBoard(boardsId))
    }
  }, [boardsId, dispatch])

  useEffect(() => {
    if (board.item) {
      setTitle(board.item.title)
      setDescription(board.item.description)
      setSections(board.item.sections)
      setIsFavorite(board.item.favourite)
      setIcon(board.item.icon)
    }
  }, [board.item])

  const onIconChange = async (newIcon: string) => {
    setIcon(newIcon)
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
            <IconButton>
              {isFavorite ? <StarIcon /> : <StarOutlineOutlinedIcon />}
            </IconButton>
            {board.item?.id}
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          <Box sx={{ padding: '10px 50px' }}>
            <Box>
              <EmojiPicker icon={icon} onChange={onIconChange} />
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
