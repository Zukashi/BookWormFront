import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import * as mongoose from "mongoose";


export interface BookState {
  _id:mongoose.Types.ObjectId | string,
  title:string,
  author:string,
  isbn:string,
  publish_date:number,
  subjects:string[],
  description:string,
  number_of_pages:number,
  languages:string[],
  publishers:string[],
  works:string[],
  ratingTypeAmount:number,
  amountOfRates:number,
  shelves:{
    already_read:string[],
    want_to_read:string[],
    currently_reading:string[]
  },
  reviews:{readonly _id:string,
    readonly user:any,
    description?:string,
    rating:number,
    status:string,
    date:Date | null,
    likes:{
      usersThatLiked:{
        user:any,
        _id:string,
      }[],
      amount:number,
    },
    spoilers:boolean,
    comments:{
      user:any,
      commentMsg:string,
      date:Date,
      _id:string,

    }[]
}
}
const bookInitial: BookState = {
  _id:'',
  amountOfRates: 0,
  author: "",
  description: "",
  isbn: "",
  languages: [],
  number_of_pages: 0,
  publish_date: 0,
  publishers: [],
  ratingTypeAmount: 0,
  reviews: {
    _id: "",
    comments: [],
    date: null,
    likes: {amount: 0, usersThatLiked: []},
    rating: 0,
    spoilers: false,
    status: "",
    user: undefined
  },
  shelves: {already_read: [], currently_reading: [], want_to_read: []},
  subjects: [],
  title: "",
  works: []
}

const initialState = {
  book: bookInitial
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook:(state,action:PayloadAction<any>) => {
      state.book = action.payload
},
  },
})

export const {  setBook } = bookSlice.actions

export default bookSlice.reducer