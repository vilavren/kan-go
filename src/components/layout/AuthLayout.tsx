import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { fetchIsAuth } from '../../store/auth/auth.slice'
import { Status } from '../../store/auth/auth.types'
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

  console.log('layout')
  return (
    <div>
      <Outlet />
    </div>
  )
}
