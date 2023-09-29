import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../store/store'
import { getMe } from '../store/auth/auth.slice'
import { Status } from '../store/auth/auth.types'
import { Loading } from '../components/common/Loading'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>()

  const { data, status } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [])

  if (status === Status.LOADING) {
    return <Loading fullHeight />
  } else if (!data) {
    return <Navigate to="/login" replace />
  }
  return children
}
