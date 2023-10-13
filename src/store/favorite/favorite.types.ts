import { Status } from '../../interfaces/status.enum'
import { IBoard } from '../boards/boards.types'

export interface IFavoritesState {
  items: IBoard[]
  status: Status
}
