import { Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Status } from '../../interfaces/status.enum'
import { fetchIsAuth } from '../../store/auth/auth.asyncActions'
import { AppDispatch, RootState } from '../../store/store'
import { Loading } from '../common/Loading'

export const AuthLayout = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { jwt, status } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchIsAuth())
  }, [])

  if (status === Status.LOADING) {
    return <Loading fullHeight />
  } else if (jwt) {
    return <Navigate to="/" replace />
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>
    </Container>
  )
}
