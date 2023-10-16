import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'

import { ISection, ISectionsState } from './sections.types'

const initialState: ISectionsState = {
  section: {
    item: undefined,
    status: Status.LOADING,
  },
  sections: {
    items: [],
    status: Status.LOADING,
  },
}

export const fetchCreateSection = createAsyncThunk(
  'boards/createBoard',
  async (boardId: string) => {
    const res = await axios.post<ISection>(`/boards/${boardId}/sections`)
    return res.data
  }
)

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ISection>) => {
      state.section.item = action.payload
    },
  },
  extraReducers(builder) {
    // createSection
    builder.addCase(fetchCreateSection.pending, (state) => {
      state.section.status = Status.LOADING
    })
    builder.addCase(fetchCreateSection.fulfilled, (state, action) => {
      state.section.status = Status.SUCCESS
      state.section.item = action.payload
    })
    builder.addCase(fetchCreateSection.rejected, (state) => {
      state.section.status = Status.ERROR
    })
  },
})

export const sectionsActions = sectionsSlice.actions
export const sectionsReducer = sectionsSlice.reducer
