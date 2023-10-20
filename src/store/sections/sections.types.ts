import { Status } from '../../interfaces/status.enum'

export interface ISectionsState {
  section: {
    item: ISection | undefined
    status: Status
  }
  sections: {
    items: ISection[]
    status: Status
  }
}

export interface ISection {
  board: string
  title: string
  _id: string
  __v: number
  tasks: ITask[]
  id: string
}

export interface ISectionUpdate {
  title: string
}

export interface ITasksState {
  task: {
    item: ITask
    status: Status
  }
  tasks: {
    items: ITask[]
    status: Status
  }
}

export interface ITask {
  _id: string
  section: ITaskSection
  title: string
  content: string
  position: number
  __v: number
  id: string
}

export interface ITaskSection {
  _id: string
  board: string
  title: string
  __v: number
  id: string
}

export interface ITaskUpdate {
  title: string
}
