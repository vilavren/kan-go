import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'

import {
  fetchGetAllBoards,
  fetchCreateBoard,
  fetchUpdatePositionBoards,
  fetchGetOneBoard,
  fetchUpdateBoard,
  fetchDeleteOneBoard,
} from './boards.asyncActions'
import { IBoard, IBoardsState } from './boards.types'

const initialState: IBoardsState = {
  board: {
    item: undefined,
    status: Status.SUCCESS,
  },
  boards: {
    items: [],
    status: Status.SUCCESS,
  },
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    updateBoard: (
      state,
      action: PayloadAction<{
        boardId: string
        fieldName: string
        fieldValue: string
      }>
    ) => {
      const index = state.boards.items.findIndex(
        (e) => e.id === action.payload.boardId
      )
      state.boards.items[index] = {
        ...state.boards.items[index],
        [action.payload.fieldName]: action.payload.fieldValue,
      }
    },
    setActiveBoard: (state, action: PayloadAction<IBoard | undefined>) => {
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
    builder.addCase(fetchGetOneBoard.pending, () => {})
    builder.addCase(fetchGetOneBoard.fulfilled, (state, action) => {
      state.board.status = Status.SUCCESS
      state.board.item = action.payload
    })
    builder.addCase(fetchGetOneBoard.rejected, (state) => {
      state.board.status = Status.ERROR
      state.board.item = undefined
    })

    // fetchUpdateBoard
    builder.addCase(fetchUpdateBoard.pending, () => {})
    builder.addCase(fetchUpdateBoard.fulfilled, (state) => {
      state.board.status = Status.SUCCESS
    })
    builder.addCase(fetchUpdateBoard.rejected, (state) => {
      state.board.status = Status.ERROR
      state.board.item = undefined
    })

    // fetchDeleteOneBoard
    builder.addCase(fetchDeleteOneBoard.pending, () => {})
    builder.addCase(fetchDeleteOneBoard.fulfilled, (state) => {
      state.board.status = Status.SUCCESS
    })
    builder.addCase(fetchDeleteOneBoard.rejected, (state) => {
      state.board.status = Status.ERROR
    })
  },
})

export const boardActions = boardsSlice.actions
export const boardReducer = boardsSlice.reducer
