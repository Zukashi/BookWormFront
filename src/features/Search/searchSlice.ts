import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Docs {
  author_key:string;
  key:string;
  title:string;
  author_name:string;
  language?:string[];

}


const initialState: Docs = {
  author_key:'',
  key:'',
  title:'',
  author_name:'',
  language:[],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchUpdate: (state,action:PayloadAction<Docs>) => {
      state.author_key = action.payload.author_key
      state.author_name = action.payload.author_name
      state.key = action.payload.key
      state.title = action.payload.title
      state.language = action.payload.language
    }
  },
})

export const { searchUpdate } = searchSlice.actions

export default searchSlice.reducer