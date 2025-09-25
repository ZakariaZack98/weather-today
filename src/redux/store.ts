import { configureStore } from '@reduxjs/toolkit'
import unitReducer from './slices/unitSlice'
import weatherReducer from './slices/weatherDataSlice'

export const store = configureStore({
  reducer: {
    unit: unitReducer,
    weather: weatherReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch