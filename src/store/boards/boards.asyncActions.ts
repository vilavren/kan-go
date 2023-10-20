import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../utils/axios'

import { IBoard, IBoardUpdate } from './boards.types'

export const fetchGetAllBoards = createAsyncThunk(
  'boards/getAllBoards',
  async () => {
    const { data } = await axios.get<IBoard[]>('/boards')
    return data
  }
)

export const fetchCreateBoard = createAsyncThunk(
  'boards/createBoard',
  async () => {
    const { data } = await axios.post<IBoard>('/boards')
    return data
  }
)

export const fetchUpdatePositionBoards = createAsyncThunk(
  'boards/updatePositionBoards',
  async (params: IBoard[]) => {
    const { data } = await axios.put<IBoard[]>('/boards', params)
    return data
  }
)

export const fetchGetOneBoard = createAsyncThunk(
  'boards/getOneBoard',
  async (id: string) => {
    const { data } = await axios.get(`/boards/${id}`)
    return data
  }
)

export const fetchUpdateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, params }: { id: string; params: IBoardUpdate }) => {
    const { data } = await axios.put<IBoard>(`/boards/${id}`, params)
    return data
  }
)

export const fetchDeleteOneBoard = createAsyncThunk(
  'boards/deleteOneBoard',
  async (id: string) => {
    const { data } = await axios.delete(`/boards/${id}`)
    return data
  }
)
