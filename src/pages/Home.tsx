import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'

export const Home = () => {
  const createBoard = () => {}

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton color="info" variant="outlined" onClick={createBoard}>
        Нажмите чтобы создать первую доску
      </LoadingButton>
    </Box>
  )
}
