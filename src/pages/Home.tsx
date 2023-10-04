import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Status } from '../interfaces/status.enum'
import { fetchCreateBoard } from '../store/boards/boards.slice'
import { AppDispatch, RootState } from '../store/store'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { board } = useSelector((s: RootState) => s.boards)

  const isBoardLoading = board.status !== Status.LOADING
  const boardId = board.item?.id

  useEffect(() => {
    if (boardId) {
      navigate(`/boards/${boardId}`)
    }
  }, [boardId, navigate])

  const create = async () => {
    await dispatch(fetchCreateBoard())
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton
        color="info"
        variant="outlined"
        onClick={create}
        loading={isBoardLoading}
      >
        Нажмите чтобы создать первую доску
      </LoadingButton>
    </Box>
  )
}
