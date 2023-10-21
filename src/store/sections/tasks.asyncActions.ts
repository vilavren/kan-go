import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../utils/axios'
import { ITask, ITaskUpdate } from '../sections/sections.types'

export const fetchCreateTask = createAsyncThunk(
  'tasks/createTask',
  async ({
    boardId,
    params,
  }: {
    boardId: string
    params: { sectionId: string }
  }) => {
    const { data } = await axios.post<ITask>(`/boards/${boardId}/tasks`, params)
    return data
  }
)

export const fetchDeleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ boardId, taskId }: { boardId: string; taskId: string }) => {
    const { data } = await axios.delete(`/boards/${boardId}/tasks/${taskId}`)
    return data
  }
)

export const fetchUpdateTask = createAsyncThunk(
  'task/updateTask',
  async ({
    boardId,
    taskId,
    params,
  }: {
    boardId: string
    taskId: string
    params: ITaskUpdate
  }) => {
    const { data } = await axios.put<ITask>(
      `/boards/${boardId}/tasks/${taskId}`,
      params
    )
    return data
  }
)

export const fetchUpdatePositionTask = createAsyncThunk(
  'task/updatePositionTask',
  async ({
    boardId,
    params,
  }: {
    boardId: string
    params: {
      resourceList: ITask[]
      destinationList: ITask[]
      resourceSectionId: string
      destinationSectionId: string
    }
  }) => {
    const { data } = await axios.put(
      `/boards/${boardId}/tasks/update-position`,
      params
    )
    return data
  }
)
