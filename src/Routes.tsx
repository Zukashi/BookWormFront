import React from 'react';
import {Route, Routes} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";
import { HomeView } from './Views/HomeView';

export const AllRoutes = () => {
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
                <Route path='/home' element={<HomeView/>}/>
            </Routes>

    </>)
}