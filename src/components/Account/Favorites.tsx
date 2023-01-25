import React, {useEffect, useRef, useState} from 'react';
import { HomeNav } from '../Home/HomeNav';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav';
import {Book} from "../Book/AdminBookList";
import {OneBookFavorite} from "./OneBookFavorite";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
export const Favorites = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<null | Book[]>(null);
    const refImg = useRef<HTMLImageElement>(null);
    const axiosPrivate = useAxiosPrivate()
    const refresh = async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/favorites`)
            setFavorites(res.data)
    }
    useEffect(() => {
            refresh();
    },[]);
    return (<>

        {user.role === 'admin' ?  <HomeAdminNav/> : <HomeNav/>}
            <div className='pt-20'></div>
        {favorites?.map((favorite:any) => <OneBookFavorite  key={favorite._id} book={favorite} refresh={refresh} />)}
        </>
    )
}