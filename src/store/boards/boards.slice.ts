import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'

import { IBoard, IBoardsState } from './boards.types'

const initialState: IBoardsState = {
  board: {
    item: undefined,
    status: Status.LOADING,
  },
  boards: {
    items: [],
    status: Status.LOADING,
  },
}

export const getAllBoards = createAsyncThunk('board/getAllBoards', async () => {
  const res = await axios.get<IBoard[]>('/boards')
  return res.data
})

export const createBoard = createAsyncThunk('board/createBoard', async () => {
  const res = await axios.post<IBoard>('/boards')
  return res.data
})

const boardsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // getAllBoards
    builder.addCase(createBoard.pending, (state) => {
      state.board.status = Status.LOADING
      state.board.item = undefined
    })
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.board.status = Status.SUCCESS
      state.board.item = action.payload
    })
    builder.addCase(createBoard.rejected, (state) => {
      state.board.status = Status.ERROR
      // state.board.item = undefined
    })

    // getAllBoards
    builder.addCase(getAllBoards.pending, (state) => {
      state.boards.status = Status.LOADING
      state.boards.items = []
    })
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      state.boards.status = Status.SUCCESS
      state.boards.items = action.payload
    })
    builder.addCase(getAllBoards.rejected, (state) => {
      state.boards.status = Status.ERROR
      state.boards.items = []
    })
  },
})

export const boardActions = boardsSlice.actions
export const boardReducer = boardsSlice.reducer
