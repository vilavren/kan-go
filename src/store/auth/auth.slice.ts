import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axios from '../../utils/axios'
import { loadState } from '../storage'

import { IAuthState, ILogin, IProfile, IRegister, Status } from './auth.types'

export interface IAuthPersistentState {
  jwt: string | undefined
}

const initialState: IAuthState = {
  jwt: loadState<IAuthPersistentState>('token')?.jwt ?? undefined,
  status: Status.LOADING,
}

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (params: ILogin) => {
    try {
      const { data } = await axios.post<IProfile>('/auth/login', {
        email: params.email,
        password: params.password,
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
    }
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (params: IRegister) => {
    try {
      const { data } = await axios.post<IProfile>('/auth/register', {
        name: params.name,
        email: params.email,
        password: params.password,
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
    }
  }
)

export const fetchIsAuth = createAsyncThunk('auth/getMe', async () => {
  const { data } = await axios.get('/auth/me')
  return data
})

const authState = createSlice({
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

export const authActions = authState.actions
export const authReducer = authState.reducer
