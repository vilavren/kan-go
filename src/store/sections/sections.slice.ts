import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'
import axios from '../../utils/axios'

import { ISection, ISectionsState } from './sections.types'

const initialState: ISectionsState = {
  section: {
    item: undefined,
    status: Status.SUCCESS,
  },
  sections: {
    items: [],
    status: Status.SUCCESS,
  },
}

export const fetchCreateSection = createAsyncThunk(
  'boards/createSection',
  async (boardId: string) => {
    const res = await axios.post<ISection>(`/boards/${boardId}/sections`)
    return res.data
  }
)

export const fetchDeleteSection = createAsyncThunk(
  'boards/deleteSection',
  async ({ boardId, sectionId }: { boardId: string; sectionId: string }) => {
    const res = await axios.delete(`/boards/${boardId}/sections/${sectionId}`)
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
    setSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections.items = action.payload
    },
  },
  extraReducers(builder) {
    // createSection
    builder.addCase(fetchCreateSection.pending, () => {})
    builder.addCase(fetchCreateSection.fulfilled, (state, action) => {
      state.section.status = Status.SUCCESS
      state.sections.items = [...state.sections.items, action.payload]
    })
    builder.addCase(fetchCreateSection.rejected, (state) => {
      state.section.status = Status.ERROR
    })

    // deleteSection
    builder.addCase(fetchDeleteSection.pending, () => {})
    builder.addCase(fetchDeleteSection.fulfilled, (state) => {
      state.section.status = Status.SUCCESS
    })
    builder.addCase(fetchDeleteSection.rejected, (state) => {
      state.section.status = Status.ERROR
    })
  },
})

export const sectionsActions = sectionsSlice.actions
export const sectionsReducer = sectionsSlice.reducer
