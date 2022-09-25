import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Docs {
  author_key:string;
  key:string;
  title:string;
  author_name:string;
  language?:string[];
  isbn:string[];
  cover_edition_key:string,
  cover_i:number,
}


const DocsState: Docs = {
  author_key:'',
  key:'',
  title:'',
  author_name:'',
  language:[],
  isbn:[],
  cover_edition_key:'',
  cover_i:0,
}
export interface ResultInterface {
  Result: Docs[]
}
const initialState: ResultInterface = {
    Result : [],
};
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchUpdate: (state,action:PayloadAction<Docs[]>) => {
      state.Result = action.payload
    }
  },
})

export const { searchUpdate } = searchSlice.actions

export default searchSlice.reducer