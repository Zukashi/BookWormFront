import React from 'react';
import {HomeNav} from "../components/Home/HomeNav";
import {BooksSearchBar} from "../components/Home/HintsSearchBar";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {HomeAdminNav} from "../components/Home/AdminHome/HomeAdminNav";

export const HomeView = () => {
    const user = useSelector((state: RootState) => state.user);

    return (<>
        {
            user.isAdmin ? <HomeAdminNav/> : <div>
                <HomeNav/>
                <BooksSearchBar/>
            </div>
        }
    </>)
}