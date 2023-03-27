import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { HomeNav } from '../Home/HomeNav';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {OneBookHome} from "../Home/OneBook";
import { SpinnerComponent } from '../SpinnerComponent';
import {useParams} from "react-router";
function debounce (cb:any, delay= 500){
    let timeout:any;
    return (...args:any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}
export const Favorites = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<null | BookEntity[]>(null);
    const [searchValue, setSearchValue] = useState('');
    const params = useParams();
    console.log(params)
    const axiosPrivate = useAxiosPrivate()
    const refresh = async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${params.userId}/favorites`)
            setFavorites(res.data)
    }
    const filterBooks = debounce( async (value:string) => {
        if(value){
            setSearchValue(value)
            const res = await axiosPrivate.get(`http://localhost:3001/user/${params.userId}/favorites/filter/${value}`);
            setFavorites(res.data)
        }else{
            void refresh()
        }
    },500)

    useEffect(() => {
            void refresh();
    },[]);
    if(!favorites) return <SpinnerComponent/>
    return (<>

       <HomeNav/>
            <div className='pt-20'></div>
            <div className='flex mt-[1rem] justify-center'><label className='relative' >
                <input  className='appearance-none active:outline-none w-60 sm:w-96 border-2 rounded-lg border-cyan-500 py-2 px-4 focus:outline-none' onChange={(e) =>{
                    filterBooks(e.target.value)
                }}  placeholder='Search for books '/>
                <i className='fa-solid fa-search absolute right-2 text-xl top-1/2 -translate-y-1/2 cursor-pointer'></i>
            </label> </div>
        <div className={`${(favorites.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * favorites.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
        {favorites?.map((favorite:any) => <OneBookHome  key={favorite._id} book={favorite} refresh={refresh} />)}
        </div>
        </>
    )
}