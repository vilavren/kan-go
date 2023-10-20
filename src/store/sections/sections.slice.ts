import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../interfaces/status.enum'

import {
  fetchCreateSection,
  fetchDeleteSection,
  fetchUpdateSection,
} from './sections.asyncActions'
import { ISectionsState, ISection } from './sections.types'
import {
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateTask,
  fetchUpdatePositionTask,
} from './tasks.asyncActions'

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

    // updateSection
    builder.addCase(fetchUpdateSection.pending, () => {})
    builder.addCase(fetchUpdateSection.fulfilled, (state) => {
      state.section.status = Status.SUCCESS
    })
    builder.addCase(fetchUpdateSection.rejected, (state) => {
      state.section.status = Status.ERROR
    })

    // createTask
    builder.addCase(fetchCreateTask.pending, () => {})
    builder.addCase(fetchCreateTask.fulfilled, (state, action) => {
      const newSectionsItems = [...state.sections.items]
      const index = newSectionsItems.findIndex(
        (e) => e.id === action.payload.section.id
      )
      newSectionsItems[index].tasks.unshift(action.payload)
      state.sections.items = newSectionsItems
    })
    builder.addCase(fetchCreateTask.rejected, (state) => {
      state.sections.status = Status.ERROR
      alert('Не удалось создать задачу, попробуйте еще раз')
    })

    // deleteTask
    builder.addCase(fetchDeleteTask.pending, () => {})
    builder.addCase(fetchDeleteTask.fulfilled, () => {})
    builder.addCase(fetchDeleteTask.rejected, () => {})

    // updateTask
    builder.addCase(fetchUpdateTask.pending, () => {})
    builder.addCase(fetchUpdateTask.fulfilled, () => {})
    builder.addCase(fetchUpdateTask.rejected, () => {})

    // updatePositionTask
    builder.addCase(fetchUpdatePositionTask.pending, () => {})
    builder.addCase(fetchUpdatePositionTask.fulfilled, () => {})
    builder.addCase(fetchUpdatePositionTask.rejected, () => {})
  },
})

export const sectionsActions = sectionsSlice.actions
export const sectionsReducer = sectionsSlice.reducer
