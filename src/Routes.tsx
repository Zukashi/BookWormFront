import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";
import { HomeView } from './Views/HomeView';
import {useDispatch, useSelector} from "react-redux";
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
import {userUpdate} from "./features/User/userSlice";

export const AllRoutes = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state: RootState) => state.user);
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/auth/refreshToken`,{
                method:"POST",
                credentials:'include'
            })
            if(res.status === 403){
                navigate('/')
            }
            const data = await res.json();
            dispatch(userUpdate({
                user:{
                    _id:data.user
                },
                token:data.token
            }))
        })()
    },[])
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
                <Route path='/home' element={<HomeView/>}/>
                <Route path='/author/:authorId' element={<AuthorView/>}/>
              <Route path='/works/:bookId' element={<BookView/>}/>
              <Route path='/user/:userId' element={<AccountView/>}></Route>
               <Route path='/edit/user/:userId' element={<EditAccount/>}></Route>
            <Route path='/favorites/user/:userId' element={<Favorites/>}></Route>
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