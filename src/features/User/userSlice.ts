import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
    _id:Object,
    email: string,
    password: string,
    username:string,
    isAdmin:boolean,
}
const initialState: UserState = {
      _id:{},
      email:'',
      password:'',
      username:'',
      isAdmin:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdate: (state,action:PayloadAction<UserState>) => {
      state._id = action.payload._id
      state.email = action.payload.email
      state.username = action.payload.username
      state.password = action.payload.password
      state.isAdmin = action.payload.isAdmin
    },
    userNameUpdate: (state,action:PayloadAction<string>) => {
      state.username = action.payload
}
  },
})

export const { userUpdate , userNameUpdate } = userSlice.actions

export default userSlice.reducer