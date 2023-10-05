import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import { IBoard } from '../boards/boards.types'

import { IFavoriteState } from './favorite.types'

const initialState: IFavoriteState = {
  items: [],
  status: Status.LOADING,
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.items = action.payload
    },
  },
})

export const favoriteActions = favoriteSlice.actions
export const favoriteReducer = favoriteSlice.reducer
