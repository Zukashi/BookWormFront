import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
    _id:Object,
    email: string,
    password: string,
    username:string,
    isAdmin:boolean,
    favorites:[];
}
export interface UserState {
    user:User

}
const initialState: UserState = {
      user:{
          _id:{},
          email:'',
          password:'',
          username:'',
          isAdmin:false,
          favorites:[],
      }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdate: (state,action:PayloadAction<User>) => {

        state.user = action.payload

    },
    userNameUpdate: (state,action:PayloadAction<string>) => {
      state.user.username = action.payload
}
  },
})

export const { userUpdate , userNameUpdate } = userSlice.actions

export default userSlice.reducer