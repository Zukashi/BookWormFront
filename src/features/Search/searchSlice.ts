import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Docs {
  author_key:string;
  key:string;
  title:string;
  author_name:string;
  language?:string[];

}


const DocsState: Docs = {
  author_key:'',
  key:'',
  title:'',
  author_name:'',
  language:[],
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
    searchUpdate: (state,action:PayloadAction<ResultInterface>) => {
      state = action.payload
    }
  },
})

export const { searchUpdate } = searchSlice.actions

export default searchSlice.reducer