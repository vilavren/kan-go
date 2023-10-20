import axios from 'axios'

import { IAuthPersistentState } from '../store/auth/auth.types'
import { loadState } from '../store/localStorage'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = loadState<IAuthPersistentState>('token')?.jwt

  return config
})

export default instance
