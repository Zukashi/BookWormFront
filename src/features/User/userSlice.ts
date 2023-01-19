import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
    _id: string,
    email?: string,
    password?: string,
    username?:string,
    isAdmin?:boolean,
    favorites?:[];
    role:string,
    base64Avatar:string,
}


export interface UserState {
    user:User
    token:string,

}
const initialState: UserState = {
      user:{
          _id:'',
          email:'',
          password:'',
          username:'',
          isAdmin:false,
          favorites:[],
          role:'',
          base64Avatar:'',
      },
      token:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdate: (state,action:PayloadAction<UserState>) => {
        state.user = action.payload.user;
        state.token = action.payload.token

    },
    userNameUpdate: (state,action:PayloadAction<string>) => {
      state.user.username = action.payload
}
  },
})

export const { userUpdate , userNameUpdate } = userSlice.actions

export default userSlice.reducer