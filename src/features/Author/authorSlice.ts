import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Docs {
  key:string;
  type:string;
  name:string;
  alternate_names?:string[];
  birth_date?:string;
  top_work?:string;
  work_count:number;
  top_subjects?:string[];
  _version:string;

}

export interface AuthorState {
  numFound:number;
  start:number;
  numFoundExact: boolean;
  docs: Docs[]
}
const initialState: AuthorState = {
  docs: [],
  numFound: 0,
  numFoundExact: false,
  start: 0

}

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    authorUpdate: (state,action:PayloadAction<AuthorState>) => {
      state.start = action.payload.start
      state.docs = action.payload.docs
      state.numFound = action.payload.numFound
      state.numFoundExact = action.payload.numFoundExact
    }
  },
})

export const { authorUpdate } = authorSlice.actions

export default authorSlice.reducer