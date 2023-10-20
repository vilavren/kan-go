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

export interface ITask {
  title: string
  id: string
}

export interface ISectionUpdate {
  title?: string
}
