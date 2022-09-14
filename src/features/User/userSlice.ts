import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {

    email: string,
    password: string,
    username:string,

}
const initialState: UserState = {
      email:'',
      password:'',
      username:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdate: (state,action:PayloadAction<UserState>) => {
      state.email = action.payload.email
      state.username = action.payload.username
      state.password = action.payload.password
    }
  },
})

export const { userUpdate } = userSlice.actions

export default userSlice.reducer