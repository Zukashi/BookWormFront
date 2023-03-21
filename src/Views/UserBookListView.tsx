import React from 'react';
import { UserBookList } from '../components/Account/UserBookList';
import { HomeNav } from '../components/Home/HomeNav';

export const UserBookListView = () => {
        return <>
            <HomeNav/>
            <UserBookList/>
        </>
}