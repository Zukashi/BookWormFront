import React, {useEffect, useRef, useState} from 'react';
import { HomeNav } from '../Home/HomeNav';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav';

export const Favorites = () => {
    const user = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<null | Object[]>(null);
    const refImg = useRef<HTMLImageElement>(null);
    useEffect(() => {
        ( async () => {
            const res = await fetch(`http://localhost:3001/user/${user._id}/favorites`)
            const data = await res.json();
            setFavorites(data)
        })()
    },[])
    const mouseEntered = () => {
        if (refImg.current === null || refImg.current === undefined){
            return null;
        } else{
            refImg.current.classList.add('opacity-50')
        }
    }
    const mouseLeft = () => {
        if (refImg.current === null || refImg.current === undefined){
            return null;
        }
        refImg.current.classList.remove('opacity-50')
    }
    if (favorites === null){
        return <HomeNav/>
    };
    console.log(favorites)
    return (<>

        {user.isAdmin ?  <HomeAdminNav/> : <HomeNav/>}
        {favorites.map((favorite:any) => <div className='flex pt-20'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
            <Link to={`/works/${favorite.isbn_13[0]}`} className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><img ref={refImg} src={`https://covers.openlibrary.org/b/isbn/${favorite.isbn_13[0]}-L.jpg`}   className="inline-block cursor-default w-40" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/>

            </Link>

        </div>
            <div className='inline-block -ml-10 mt-20'><p className='text-[15px] font-bold w-40 leading-5
    ml-16'>It Ends With Us</p>
                <p className='text-[16px] mt-2 ml-16'>COLLEN HOOVER </p>
                <i className="fa-solid fa-cart-shopping fa-xl cursor-pointer ml-16 "></i>


        </div>
        </div>)}
        </>
    )
}