import { Status } from '../../interfaces/status.enum'
import { IBoard } from '../boards/boards.types'

export interface IFavoriteState {
  items: IBoard[]
  status: Status
}
