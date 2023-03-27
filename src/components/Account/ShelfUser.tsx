import React, {useEffect, useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import {OneBookUser} from "./OneBookUser";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import {TabPanel} from "react-tabs";
import {SpinnerComponent} from "../SpinnerComponent";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {OneBookHome} from "../Home/OneBook";
import {ProgressBookChange} from "./ProgressBookChange";
import {Link, Route} from "react-router-dom";
import {useParams} from "react-router";

export const ShelfUser = (props:{status:string}) => {
    const axiosPrivate = useAxiosPrivate();
    const params = useParams();
    const [shelfBooks, setShelfBooks] = useState<BookEntity[] | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [allBooks, setAllBooks] = useState<BookEntity[] | null>(null)
    const filterBooks = async (searchValue:string) => {
        setSearchValue(searchValue)
        if(searchValue){
            const res = await axiosPrivate.get(`http://localhost:3001/user/${params.userId}/shelf/${props.status}/${searchValue}/filtered`);

            setShelfBooks(res.data)
        }else{
            void refresh()
        }
    }
    const refresh = async () => {
        const response = await axiosPrivate.get(`http://localhost:3001/user/${params.userId}/shelf/${props.status}`);
        setShelfBooks(response.data)
        setAllBooks(response.data)
    }
    useEffect(() => {
        void refresh();
    }, [])
    if(!shelfBooks || !allBooks) return <SpinnerComponent/>
    return (<>

            {allBooks?.length > 0  &&   <div className='flex mt-[1rem] justify-center'><label className='relative' >
                <input value={searchValue} className='appearance-none active:outline-none w-60 sm:w-96 border-2 rounded-lg border-cyan-500 py-2 px-4 focus:outline-none' onChange={(e) => filterBooks(e.target.value)}  placeholder='Search for books '/>
                <i className='fa-solid fa-search absolute right-2 text-xl top-1/2 -translate-y-1/2 cursor-pointer'></i>
            </label> </div>}
        <div className={`${(shelfBooks?.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * shelfBooks?.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
            {shelfBooks?.map((book:BookEntity) => {
                    return <OneBookHome key={book._id.toString()} book={book} refresh={refresh}/>

            })}

            {allBooks.length < 1 && <p className={'text-center font-bold text-3xl mt-[10%]'}>This shelf is empty</p>}</div>
            {shelfBooks.length < 1 && allBooks.length > 0 && <p className={'text-center font-bold text-3xl mt-[10%]'}>Not found any books</p>}

          </>)
}