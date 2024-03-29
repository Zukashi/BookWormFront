import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import bookReducer from "../features/Books/bookSlice";
import authorReducer from "../features/Author/authorSlice";
import searchReducer from "../features/Search/searchSlice";
import categoryReducer from "../features/Search/categorySlice";
import homeReducer from "../features/HomeSlice";
import drawerReducer from "../features/Drawer";
export const store = configureStore({
  devTools:false,
  reducer: {
    user:userReducer,
    book:bookReducer,
    author:authorReducer,
    search:searchReducer,
    category:categoryReducer,
    home:homeReducer,
    drawer:drawerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch