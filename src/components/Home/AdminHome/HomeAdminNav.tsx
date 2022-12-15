import React, {ReactNode} from 'react';
import {HomeNav} from "../HomeNav";
import {BooksSearchBar} from "../HintsSearchBar";
import {MainBooks} from "../MainBooks";
import {HomeNavAdmin} from "./HomeNavAdmin";




export const HomeAdminNav = () => {
    return <> <HomeNavAdmin/>
        <BooksSearchBar/>
        <MainBooks/>
    </>


}