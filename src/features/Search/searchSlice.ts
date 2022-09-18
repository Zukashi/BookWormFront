import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Docs {
  key:string;
  type:string;
  title:string;
  title_suggest:string;
  edition_count:number;
  first_publish_year:number;
  language?:string[];
  seed: string[];
  birth_date?:string;
  top_work?:string;
  top_subjects?:string[];
  _version:string;

}

export interface SearchState {
  numFound:number;
  start:number;
  numFoundExact: boolean;
  docs: Docs[]
}
const initialState: SearchState = {
  docs: [],
  numFound: 0,
  numFoundExact: false,
  start: 0

}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchUpdate: (state,action:PayloadAction<SearchState>) => {
      state = action.payload
      console.log(state)
    }
  },
})

export const { searchUpdate } = searchSlice.actions

export default searchSlice.reducer