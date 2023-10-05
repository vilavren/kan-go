import { Status } from '../../interfaces/status.enum'

export interface IBoardsState {
  board: {
    item: IBoard | undefined
    status: Status
  }
  boards: {
    items: IBoard[]
    status: Status
  }
}

export interface IBoard {
  _id: string
  user: string
  icon: string
  title: string
  description: string
  position: number
  favourite: boolean
  favouritePosition: number
  __v: number
  sections: []
  id: string
}

export interface IBoardUpdate {
  icon?: string
  title?: string
  description?: string
  sections?: []
  favourite?: boolean
}
