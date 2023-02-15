import React from 'react';
import {Button, Input} from "@chakra-ui/react";
import {OneBookUser} from "./OneBookUser";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import {TabPanel} from "react-tabs";

export const ShelfUser = (props:{shelves:any,status:string, refresh: () => Promise<void>}) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state:RootState) => state.user)
    const filterBooks = async (searchValue:string) => {
            await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
    }
    console.log(props)
    return (<>

            {props.shelves[props.status].length > 0 && <div className='flex mt-[1rem]'><Input onChange={(e) => filterBooks(e.target.value)}  placeholder='Search your reading log'/>
                <Button>Submit</Button></div>}
            {props.shelves[props.status].length > 0 ? props.shelves[props.status].map((bookId:any) => {
                    return <OneBookUser key={bookId} id={bookId.book} refresh={props.refresh} status={props.status} />}):
                <p className={'text-center font-bold text-3xl mt-[10%]'}>This shelf is empty</p>}
          </>)
}