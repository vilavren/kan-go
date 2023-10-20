import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axios from '../../utils/axios'

import { IProfile, ILogin, IRegister } from './auth.types'

const createAuthThunk = <T>(url: string, payloadKey: string) => {
  return createAsyncThunk<IProfile, T>(
    `auth/${payloadKey}`,
    async (params: T) => {
      try {
        // const { data }: AxiosResponse<IProfile> = await axios.post(url, params)
        const response = await axios.post<IProfile>(url, params)
        return response.data
      } catch (error) {
        // if (axios.isAxiosError(error)) {}
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message)
        }
        throw error
      }
    }
  )
}

export const fetchLogin = createAuthThunk<ILogin>('/auth/login', 'login')

export const fetchRegister = createAuthThunk<IRegister>(
  '/auth/register',
  'register'
)

export const fetchIsAuth = createAsyncThunk('auth/getMe', async () => {
  const { data } = await axios.get<IProfile>('/auth/me')
  return data
})

// export const fetchLogin = createAsyncThunk(
//   'auth/login',
//   async (params: ILogin) => {
//     try {
//       const { data } = await axios.post<IProfile>('/auth/login', {
//         email: params.email,
//         password: params.password,
//       })
//       return data
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         throw new Error(error.response?.data.message)
//       }
//     }
//   }
// )

// export const fetchRegister = createAsyncThunk(
//   'auth/register',
//   async (params: IRegister) => {
//     try {
//       const { data } = await axios.post<IProfile>('/auth/register', {
//         name: params.name,
//         email: params.email,
//         password: params.password,
//       })
//       return data
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         console.log(error)
//         throw new Error(error.response?.data.message)
//       }
//     }
//   }
// )
