import React from 'react';
import {Route, Routes} from "react-router-dom";
import {LoginPageView} from "./Views/LoginPageView";
import {Register} from "./components/Register/Register";

export const AllRoutes = () => {
    return (<>

            <Routes>
                <Route path='/' element={<LoginPageView/>}/>
                <Route path='/create-account' element={<Register/>}/>
            </Routes>

    </>)
}