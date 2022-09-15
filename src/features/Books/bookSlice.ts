import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BookState {
  title:string,
  author:string,
}
export interface Books {
  books:BookState[];
}
const initialState: Books = {
  books:[],
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    bookUpdate: (state,action:PayloadAction<BookState[]>) => {
      state.books = action.payload
    }
  },
})

export const { bookUpdate } = bookSlice.actions

export default bookSlice.reducer