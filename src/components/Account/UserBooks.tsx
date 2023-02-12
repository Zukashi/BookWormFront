import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {Button, Input, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {OneBookUser} from "./OneBookUser";
import {ShelfUser} from "./ShelfUser";
import ProgressBar from "@ramonak/react-progress-bar";

export const UserBooks = () => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state: RootState) => state.user);
    const [shelves ,setShelves] = useState<{read:string[], wantToRead:string[], currentlyReading:string[]}>();
    const refresh = async() => {
        const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/books`)
        console.log(res.data, 111)
        setShelves(res.data)
    };

    useEffect(() => {
        refresh();
    }, [])
    console.log(shelves)
    if (!shelves){
        return <h1>1</h1>
    };
    console.log(Object.keys(shelves).length)
    const statuses = ['read', 'currentlyReading', 'wantToRead']
    return (<>

        <HomeNav/>
        <div className='pt-16'></div>
        <Tabs width={'100vw'} variant='enclosed' colorScheme='green' align={'center'} orientation='horizontal'>
            <TabList mb='1em'>
                <Tab _selected={{color:'white', bg:'blue.500'}}>Read</Tab>
                <Tab _selected={{color:'white', bg:'blue.500'}}>Currently Reading</Tab>
                <Tab _selected={{color:'white', bg:'blue.500'}}>Want To Read</Tab>
            </TabList>
            <TabPanels>
                {
                    statuses.map((status:string) => <ShelfUser key={status} shelves={shelves} status={status} refresh={refresh}/>)
                }


            </TabPanels>
        </Tabs>
    </>)
}