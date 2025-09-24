import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UnitType = 'celsius' | 'fahrenheit'

interface UnitState {
  value: UnitType
}

const initialState: UnitState = {
  value: 'celsius',
}

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<UnitType>) => {
      state.value = action.payload
    },
    toggleUnit: (state) => {
      state.value = state.value === 'celsius' ? 'fahrenheit' : 'celsius'
    },
  },
})

export const { setUnit, toggleUnit } = unitSlice.actions
export default unitSlice.reducer