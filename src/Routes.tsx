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
import {Spinner} from "@chakra-ui/react";
import {ResetPassword} from "./components/Login/ResetPassword";
import { ReviewAdd } from './components/Book/ReviewAdd';

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
            console.log(data)
            dispatch(userUpdate({
                user:data.user,
                token:data.token
            }))
        })()
    },[]);
    console.log(user)
    while(typeof user._id !== 'string' || user._id === '' ){

            return <>
                <div className='pt-20'></div>
                <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>

    }
    console.log(user)
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
                <Route path='/home' element={<HomeView/>}/>
                <Route path='/author/:authorId' element={<AuthorView/>}/>
              <Route path='/book/:bookId' element={<BookView/>}/>
              <Route path='/reset-password' element={<ResetPassword/>}/>
              <Route path='/user/:userId' element={<AccountView/>}></Route>
                <Route path='/review/new/:bookId' element={<ReviewAdd/>}></Route>
               <Route path='/edit/user/:userId' element={<EditAccount/>}></Route>
            <Route path='/favorites/user/:userId' element={<Favorites/>}></Route>
                {user.role === 'admin' &&  <Route path='/admin/books'>
                    <Route index  element={<BookListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyBook/>}></Route>
                </Route>}
                {user.role === 'admin' &&  <Route path='/admin/users'>
                    <Route index  element={<UserListView/>}></Route>
                    <Route path='modify/:id'element={<ModifyUser/>}></Route>
                </Route>}

                {user.role === 'admin' && <Route path='/addBook' element={<AddBookAdmin/>}></Route>}
            </Routes>

    </>)
}