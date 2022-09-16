import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import bookReducer from "../features/Books/bookSlice";
import AuthorSlice from "../features/Author/authorSlice";
export const store = configureStore({
  reducer: {
    user:userReducer,
    book:bookReducer,
    author:AuthorSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch