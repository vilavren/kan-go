import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth/auth.slice'
import { boardReducer } from './boards/boards.slice'
import { favoriteReducer } from './favorite/favorite.slice'
import { saveState } from './storage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    favorite: favoriteReducer,
  },
})

store.subscribe(() => {
  saveState({ jwt: store.getState().auth.jwt }, 'token')
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
