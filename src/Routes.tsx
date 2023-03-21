import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";
import { HomeView } from './Views/HomeView';
import { useSelector} from "react-redux";
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
import {ResetPassword} from "./components/Login/ResetPassword";
import { ReviewAdd } from './components/Book/ReviewAdd';
import {ReviewEdit} from "./components/Book/ReviewEdit";
import PersistLogin from "./components/PersistLogin";
import {UserBooks} from "./components/Account/UserBooks";
import {CategoryView} from "./Views/CategoryView";
import {ProgressBookChange} from "./components/Account/ProgressBookChange";
import {Redirect} from "./components/Redirect";
import { UserBookListView } from './Views/UserBookListView';

export const AllRoutes = () => {
    const {user} = useSelector((state: RootState) => state.user);


    return (<>

            <Routes>
                <Route path='/' element={<Redirect/>}></Route>
                <Route path='/create-account' element={<Register/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/login' element={<LoginPageView/>}/>
               <Route element={<PersistLogin/>}>     <Route path='home' element={<HomeView/>}/>
                <Route path='author/:authorId' element={<AuthorView/>}/>
              <Route path='book/:bookId' element={<BookView/>}/>
              <Route path='user/:userId' element={<AccountView/>}>

              </Route>
                   <Route path='user/:userId/lists' element={<UserBookListView/>}></Route>
                   <Route path='user/:userId/book/:bookId/:status/progress' element={<ProgressBookChange/>}></Route>
                   <Route path='user/:userId/books' element={<UserBooks/>}></Route>
                <Route path='review/new/:bookId' element={<ReviewAdd/>}></Route>
                <Route path='review/edit/:bookId' element={<ReviewEdit/>}></Route>
               <Route path='edit/user/:userId' element={<EditAccount/>}></Route>
            <Route path='favorites/user/:userId' element={<Favorites/>}></Route>
            <Route path='category' element={<CategoryView/>}></Route>
                 <Route path='admin/books'>
                    <Route index  element={<BookListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyBook/>}></Route>
                </Route>
                <Route path='admin/users'>
                    <Route index  element={<UserListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyUser/>}></Route>
                </Route>

                 <Route path='addBook' element={<AddBookAdmin/>}></Route>
               </Route>
            </Routes>

    </>)
}