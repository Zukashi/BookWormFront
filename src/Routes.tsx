import React from 'react';
import {Route, Routes} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";
import { HomeView } from './Views/HomeView';
import {useSelector} from "react-redux";
import {RootState} from "./app/store";
import {AuthorView} from "./Views/AuthorView";
import {BookView} from "./Views/BookView";

export const AllRoutes = () => {
  const user = useSelector((state: RootState) => state.user);
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
              {user.password && <Route path='/home' element={<HomeView/>}/>}
                <Route path='/author/:authorId' element={<AuthorView/>}/>
                <Route path='/works/:bookId' element={<BookView/>}/>
            </Routes>

    </>)
}