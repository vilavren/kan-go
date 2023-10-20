import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth/auth.slice'
import { boardReducer } from './boards/boards.slice'
import { favoritesReducer } from './favorite/favorite.slice'
import { sectionsReducer } from './sections/sections.slice'
import { saveState } from './localStorage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    favorites: favoritesReducer,
    sections: sectionsReducer,
  },
})

store.subscribe(() => {
  saveState({ jwt: store.getState().auth.jwt }, 'token')
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
