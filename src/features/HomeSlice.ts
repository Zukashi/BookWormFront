import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface HomeSlice {
    modal:boolean,
}
const HomeInitial: HomeSlice = {
    modal:false,
}

const initialState = {
    home: HomeInitial,
    currentEditListName:''
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSecondModal:(state,action:PayloadAction<boolean>) => {
            state.home.modal = action.payload
        },
        changeCurrentEditListName:(state, action:PayloadAction<string>) => {
            state.currentEditListName = action.payload
        },
    },
})

export const {  setSecondModal, changeCurrentEditListName } = homeSlice.actions

export default homeSlice.reducer