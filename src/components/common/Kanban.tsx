import { Box, Button, Divider, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'

export const Kanban = () => {
  const { board } = useSelector((s: RootState) => s.boards)

  const [sections, setSections] = useState<[]>([])

  useEffect(() => {
    if (board.item) {
      setSections(board.item.sections)
    }
  }, [board.item])

  return (
    <>
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
    </>
  )
}
