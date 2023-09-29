import { Box, CircularProgress } from '@mui/material'

export const Loading = ({ fullHeight }: { fullHeight: boolean }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullHeight ? '100vh' : '100%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
