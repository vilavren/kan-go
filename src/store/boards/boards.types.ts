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
  user: string
  icon: string
  title: string
  description: string
  position: number
  favourite: boolean
  favouritePosition: number
  _id: string
  __v: number
  id: string
}
