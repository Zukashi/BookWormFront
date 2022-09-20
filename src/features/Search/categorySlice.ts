import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


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
    categoryUpdate: (state,action:PayloadAction<ResultInterface>) => {
      state.category = action.payload.category
    }
  },
})

export const { categoryUpdate } = categorySlice.actions

export default categorySlice.reducer