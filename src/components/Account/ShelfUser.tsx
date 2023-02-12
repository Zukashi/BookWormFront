import React from 'react';
import {Button, Input, TabPanel} from "@chakra-ui/react";
import {OneBookUser} from "./OneBookUser";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

export const ShelfUser = (props:{shelves:any,status:string, refresh: () => Promise<void>}) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state:RootState) => state.user)
    const filterBooks = async (searchValue:string) => {
            await axiosPrivate.get(`http://localhost:3001/user/${user._id}/`)
    }
    console.log(props)
    return (<>
        <TabPanel>
            {props.shelves[props.status].length > 0 && <div className='flex'><Input onChange={(e) => filterBooks(e.target.value)}  placeholder='Search your reading log'/>
                <Button>Submit</Button></div>}
            {props.shelves[props.status].length > 0 ? props.shelves[props.status].map((bookId:string) => {
                    return <OneBookUser key={bookId} id={bookId} refresh={props.refresh} status={props.status} />}):
                <p>This shelf is empty</p>}
        </TabPanel></>)
}