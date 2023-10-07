import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Status } from '../../interfaces/status.enum'
import { fetchIsAuth } from '../../store/auth/auth.slice'
import { AppDispatch, RootState } from '../../store/store'
import { Loading } from '../common/Loading'
import { Sidebar } from '../common/Sidebar'

export const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { jwt, status } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchIsAuth())
  }, [])

  if (status === Status.LOADING) {
    return <Loading fullHeight />
  } else if (!jwt) {
    return <Navigate to="/login" replace />
  }
  return (
    <div>
      {
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              width: '100vw',
              height: '100vh',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      }
    </div>
  )
}
