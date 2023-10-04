import { useSelector } from 'react-redux'

import { RootState } from '../store/store'

export const Board = () => {
  const board = useSelector((s: RootState) => s.boards.board.item)

  return <div>{board?.id}</div>
}
