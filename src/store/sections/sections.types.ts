import { Status } from '../../interfaces/status.enum'

export interface ISectionsState {
  section: {
    item: ISection | undefined
    status: Status
  }
  sections: {
    items: []
    status: Status
  }
}

export interface ISection {
  board: string
  title: string
  _id: string
  __v: number
  tasks: any[]
  id: string
}
