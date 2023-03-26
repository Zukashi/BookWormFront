import React, {useEffect, useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import {OneBookUser} from "./OneBookUser";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import {TabPanel} from "react-tabs";
import {SpinnerComponent} from "../../SpinnerComponent";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {OneBookHome} from "../Home/OneBook";
import {ProgressBookChange} from "./ProgressBookChange";
import {Link, Route} from "react-router-dom";

export const ShelfUser = (props:{status:string}) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state:RootState) => state.user);
    const [shelfBooks, setShelfBooks] = useState<BookEntity[] | null>(null)
    const filterBooks = async (searchValue:string) => {
            await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
    }
    const refresh = async () => {
        const response = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/shelf/${props.status}`);
        setShelfBooks(response.data)
    }
    useEffect(() => {
        void refresh();
    }, [])
    if(!shelfBooks) return <SpinnerComponent/>
    return (<>

            {shelfBooks.length > 0 && <div className='flex mt-[1rem]'><Input onChange={(e) => filterBooks(e.target.value)}  placeholder='Search your reading log'/>
                <Button>Submit</Button></div>}
        <div className={`${(shelfBooks.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * shelfBooks.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
            {shelfBooks?.map((book:BookEntity) => {
                    return <OneBookHome key={book._id.toString()} book={book} refresh={refresh}/>

            })}

            {shelfBooks.length < 1 && <p className={'text-center font-bold text-3xl mt-[10%]'}>This shelf is empty</p>}</div>


          </>)
}