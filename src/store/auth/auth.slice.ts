import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { IAuthState, Status } from './auth.types'

const initialState: IAuthState = {
  data: null,
  status: Status.LOADING,
}

export const login = createAsyncThunk('auth/login', async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data
})

export const register = createAsyncThunk('auth/register', async (params) => {
  const { data } = await axios.post('/auth/register', params)
  return data
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
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
    builder.addCase(login.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(login.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })

    builder.addCase(register.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(register.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })

    builder.addCase(getMe.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.data = action.payload
    })
    builder.addCase(getMe.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
  },
})

export const { logout } = authState.actions
export const authReducer = authState.reducer
