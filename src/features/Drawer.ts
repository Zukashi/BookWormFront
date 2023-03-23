import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const DrawerInitial = false;


const initialState = {
    drawer: DrawerInitial,
}

export const drawerSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setDrawer:(state,action:PayloadAction<boolean>) => {

                state.drawer = action.payload


        },
    },
})

export const {   setDrawer } = drawerSlice.actions

export default drawerSlice.reducer