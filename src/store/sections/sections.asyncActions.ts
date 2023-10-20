import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../utils/axios'

import { ISection, ISectionUpdate } from './sections.types'

export const fetchCreateSection = createAsyncThunk(
  'sections/createSection',
  async (boardId: string) => {
    const { data } = await axios.post<ISection>(`/boards/${boardId}/sections`)
    return data
  }
)

export const fetchDeleteSection = createAsyncThunk(
  'sections/deleteSection',
  async ({ boardId, sectionId }: { boardId: string; sectionId: string }) => {
    const { data } = await axios.delete(
      `/boards/${boardId}/sections/${sectionId}`
    )
    return data
  }
)

export const fetchUpdateSection = createAsyncThunk(
  'sections/updateSection',
  async ({
    boardId,
    sectionId,
    params,
  }: {
    boardId: string
    sectionId: string
    params: ISectionUpdate
  }) => {
    const { data } = await axios.put<ISection>(
      `/boards/${boardId}/sections/${sectionId}`,
      params
    )
    return data
  }
)
