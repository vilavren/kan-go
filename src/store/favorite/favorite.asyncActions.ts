import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../utils/axios'
import { IBoard } from '../boards/boards.types'

export const fetchGetFavorites = createAsyncThunk(
  'boards/getFavorites',
  async () => {
    const { data } = await axios.get<IBoard[]>('/favorites')
    return data
  }
)

export const fetchUpdateFavoritesPositionBoards = createAsyncThunk(
  'boards/updateFavoritesPositionBoards',
  async (params: IBoard[]) => {
    const { data } = await axios.put<IBoard[]>('/favorites', params)
    return data
  }
)
