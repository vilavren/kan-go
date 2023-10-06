import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'

import { IBoard, IBoardUpdate, IBoardsState } from './boards.types'

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

export const fetchGetAllBoards = createAsyncThunk(
  'boards/getAllBoards',
  async () => {
    const res = await axios.get<IBoard[]>('/boards')
    return res.data
  }
)

export const fetchCreateBoard = createAsyncThunk(
  'boards/createBoard',
  async () => {
    const res = await axios.post<IBoard>('/boards')
    return res.data
  }
)

export const fetchUpdatePositionBoards = createAsyncThunk(
  'boards/updatePositionBoards',
  async (params: IBoard[]) => {
    const res = await axios.put<IBoard[]>('/boards', params)
    return res.data
  }
)

export const fetchGetOneBoard = createAsyncThunk(
  'boards/fetchGetOneBoard',
  async (id: string) => {
    const res = await axios.get(`/boards/${id}`)
    return res.data
  }
)

export const fetchUpdateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, params }: { id: string; params: IBoardUpdate }) => {
    const res = await axios.put<IBoard>(`/boards/${id}`, params)
    return res.data
  }
)

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<IBoard>) => {
      state.board.item = action.payload
    },
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards.items = action.payload
    },
  },
  extraReducers(builder) {
    // getAllBoards
    builder.addCase(fetchGetAllBoards.pending, (state) => {
      state.boards.status = Status.LOADING
      state.boards.items = []
    })
    builder.addCase(fetchGetAllBoards.fulfilled, (state, action) => {
      state.boards.status = Status.SUCCESS
      state.boards.items = action.payload
    })
    builder.addCase(fetchGetAllBoards.rejected, (state) => {
      state.boards.status = Status.ERROR
      state.boards.items = []
    })

    // createBoard
    builder.addCase(fetchCreateBoard.pending, (state) => {
      state.board.status = Status.LOADING
      state.board.item = undefined
    })
    builder.addCase(fetchCreateBoard.fulfilled, (state, action) => {
      state.board.status = Status.SUCCESS
      state.board.item = action.payload
      state.boards.items = [action.payload, ...state.boards.items]
    })
    builder.addCase(fetchCreateBoard.rejected, (state) => {
      state.board.status = Status.ERROR
    })

    // updatePositionBoards
    builder.addCase(fetchUpdatePositionBoards.pending, (state) => {
      state.boards.status = Status.LOADING
    })
    builder.addCase(fetchUpdatePositionBoards.fulfilled, (state) => {
      state.boards.status = Status.SUCCESS
    })
    builder.addCase(fetchUpdatePositionBoards.rejected, (state) => {
      state.boards.status = Status.ERROR
    })

    // fetchGetOneBoard
    builder.addCase(fetchGetOneBoard.pending, () => {
      // state.board.status = Status.LOADING
    })
    builder.addCase(fetchGetOneBoard.fulfilled, (state, action) => {
      state.board.status = Status.SUCCESS
      state.board.item = action.payload
    })
    builder.addCase(fetchGetOneBoard.rejected, (state) => {
      state.board.status = Status.ERROR
      state.board.item = undefined
    })

    // fetchUpdateBoard
    builder.addCase(fetchUpdateBoard.pending, () => {
      // state.board.status = Status.LOADING
    })
    builder.addCase(fetchUpdateBoard.fulfilled, (state) => {
      state.board.status = Status.SUCCESS
      // state.board.item = action.payload
    })
    builder.addCase(fetchUpdateBoard.rejected, (state) => {
      state.board.status = Status.ERROR
      state.board.item = undefined
    })
  },
})

export const boardActions = boardsSlice.actions
export const boardReducer = boardsSlice.reducer
