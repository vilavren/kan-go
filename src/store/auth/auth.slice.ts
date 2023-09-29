import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import {
  IIsAuth,
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  Status,
} from './auth.types'

const initialState: IIsAuth = {
  data: null,
  status: Status.LOADING,
}

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (params: ILogin) => {
    const { data } = await axios.post('/auth/login', params)
    return data
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (params: IRegister) => {
    const { data } = await axios.post('/auth/register', params)
    return data
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
      state.data = null
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })

    builder.addCase(fetchIsAuth.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchIsAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(fetchIsAuth.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
  },
})

export const { logout } = authState.actions
export const authReducer = authState.reducer
