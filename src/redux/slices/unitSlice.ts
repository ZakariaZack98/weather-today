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
    }
  },
})

export const { setUnit } = unitSlice.actions
export default unitSlice.reducer