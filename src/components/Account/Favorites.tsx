import React, {useEffect, useRef, useState} from 'react';
import { HomeNav } from '../Home/HomeNav';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav';
import {OneBook} from "../Home/OneBook";
import {Book} from "../Book/AdminBookList";
import {Spinner} from "@chakra-ui/react";
export const Favorites = () => {
    const user = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<null | Book[]>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const refImg = useRef<HTMLImageElement>(null);
    const refresh = async () => {
            const res = await fetch(`http://localhost:3001/user/${user._id}/favorites`)
            const data = await res.json();
            setFavorites(data)
    }
    useEffect(() => {
            refresh();
            const timer = setTimeout(() => {
                setLoading(false)
            }, 200)
        return () => clearInterval(timer)
    },[]);

    while (loading){
        return <>  {user.isAdmin ?  <HomeAdminNav/> : <HomeNav/>}
            <div className='pt-20'></div>
        <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
    }
    return (<>

        {user.isAdmin ?  <HomeAdminNav/> : <HomeNav/>}
            <div className='pt-20'></div>
        {favorites?.map((favorite:any) => <OneBook  key={favorite._id} book={favorite} refresh={refresh} />)}
        </>
    )
}