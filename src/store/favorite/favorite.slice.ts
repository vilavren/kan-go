import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'
import { IBoard } from '../boards/boards.types'

import { IFavoritesState } from './favorite.types'

const initialState: IFavoritesState = {
  items: [],
  status: Status.LOADING,
}

export const fetchGetFavorites = createAsyncThunk(
  'boards/getFavorites',
  async () => {
    const res = await axios.get<IBoard[]>('/favorites')
    return res.data
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.items = action.payload
    },
  },
  extraReducers(builder) {
    // getFavorites
    builder.addCase(fetchGetFavorites.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchGetFavorites.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchGetFavorites.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const favoritesActions = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
