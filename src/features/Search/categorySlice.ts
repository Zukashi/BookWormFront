import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type category = string
export interface ResultInterface {
  category:string
}
const initialState: ResultInterface = {
  category : 'q'
};
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryUpdate: (state,action:PayloadAction<category>) => {
      console.log(123)
      console.log(action.payload)
      state.category = action.payload
    }
  },
})

export const { categoryUpdate } = categorySlice.actions

export default categorySlice.reducer