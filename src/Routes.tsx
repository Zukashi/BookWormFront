import React from 'react';
import {Route, Routes} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";
import { HomeView } from './Views/HomeView';
import {useSelector} from "react-redux";
import {RootState} from "./app/store";
import {AuthorView} from "./Views/AuthorView";
import {BookView} from "./Views/BookView";
import {AccountView} from "./Views/AccountView";
import {EditAccount} from "./components/Account/EditAccount";
import { Favorites } from './components/Account/Favorites';
import {BookListView} from "./Views/BookListView";
import {AddBookAdmin} from "./components/Book/AddBookAdmin";
import { ModifyBook } from './components/Book/ModifyBook';
import { ModifyUser } from './components/Account/admin/modifyUser';
import {UserListView} from "./Views/UserListView";

export const AllRoutes = () => {
  const {user} = useSelector((state: RootState) => state.user);
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
              {user.password && <Route path='/home' element={<HomeView/>}/>}
                {user.password &&  <Route path='/author/:authorId' element={<AuthorView/>}/>}
                {user.password && <Route path='/works/:bookId' element={<BookView/>}/>}
                {user.password &&  <Route path='/user/:userId' element={<AccountView/>}></Route>}
                {user.password && <Route path='/edit/user/:userId' element={<EditAccount/>}></Route>}
                {user.password &&  <Route path='/favorites/user/:userId' element={<Favorites/>}></Route>}
                {user.isAdmin &&  <Route path='/admin/books'>
                    <Route index  element={<BookListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyBook/>}></Route>
                </Route>}
                {user.isAdmin &&  <Route path='/admin/users'>
                    <Route index  element={<UserListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyUser/>}></Route>
                </Route>}

                {user.password && <Route path='/addBook' element={<AddBookAdmin/>}></Route>}
            </Routes>

    </>)
}