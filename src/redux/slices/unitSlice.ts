import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UnitType = 'metric' | 'imperial'

interface UnitState {
  value: UnitType
}

const initialState: UnitState = {
  value: 'metric',
}

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<UnitType>) => {
      state.value = action.payload
    },
    toggleUnit: (state) => {
      state.value = state.value === 'metric' ? 'imperial' : 'metric'
    },
  },
})

export const { setUnit, toggleUnit } = unitSlice.actions
export default unitSlice.reducer