import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'
import { loadState } from '../storage'

import {
  IAuthPersistentState,
  IAuthState,
  ILogin,
  IProfile,
  IRegister,
} from './auth.types'

const initialState: IAuthState = {
  jwt: loadState<IAuthPersistentState>('token')?.jwt ?? undefined,
  status: Status.LOADING,
}

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
  const response = await axios.get<IProfile>('/auth/me')
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = undefined
      state.jwt = undefined
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING
      state.jwt = undefined
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.jwt = action.payload?.token
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = Status.ERROR
      state.loginErrorMessage = action.error.message
    })

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING
      state.data = undefined
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
      state.jwt = action.payload?.token
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = Status.ERROR
      state.registerErrorMessage = action.error.message
    })

    builder.addCase(fetchIsAuth.pending, (state) => {
      state.status = Status.LOADING
      state.data = undefined
    })
    builder.addCase(fetchIsAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(fetchIsAuth.rejected, (state) => {
      state.status = Status.ERROR
      state.data = undefined
    })
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
