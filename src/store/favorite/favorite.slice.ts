import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import { IBoard } from '../boards/boards.types'

import {
  fetchGetFavorites,
  fetchUpdateFavoritesPositionBoards,
} from './favorite.asyncActions'
import { IFavoritesState } from './favorite.types'

const initialState: IFavoritesState = {
  items: [],
  status: Status.LOADING,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IBoard>) => {
      state.items = [...state.items, action.payload]
    },
    removeFavorite: (state, action: PayloadAction<{ boardId: string }>) => {
      state.items = state.items.filter((e) => e.id !== action.payload.boardId)
    },
    updateBoard: (
      state,
      action: PayloadAction<{
        boardId: string
        fieldName: string
        fieldValue: string
      }>
    ) => {
      const index = state.items.findIndex(
        (e) => e.id === action.payload.boardId
      )
      state.items[index] = {
        ...state.items[index],
        [action.payload.fieldName]: action.payload.fieldValue,
      }
    },
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

    // updateFavoritesPositionBoards
    builder.addCase(fetchUpdateFavoritesPositionBoards.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchUpdateFavoritesPositionBoards.fulfilled, (state) => {
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchUpdateFavoritesPositionBoards.rejected, (state) => {
      state.status = Status.ERROR
    })
  },
})

export const favoritesActions = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
