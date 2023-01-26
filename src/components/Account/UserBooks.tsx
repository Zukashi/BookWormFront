import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {Spinner, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {OneBookUser} from "./OneBookUser";

export const UserBooks = () => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state: RootState) => state.user);
    const [shelves ,setShelves] = useState<{read:string[], wantToRead:string[], currentlyReading:string[]}>();
    useEffect(() => {
        const refresh = async() => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/books`)
            setShelves(res.data)
        };
        refresh();
    }, [])
    console.log(shelves)
    if (!shelves){
        return <h1>1</h1>
    };
    console.log(Object.keys(shelves).length)
    // @ts-ignore
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
                <TabPanel>
                    {shelves['read'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId}/>})}
                </TabPanel>
                <TabPanel>
                    {shelves['currentlyReading'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId}/>})}
                </TabPanel>
                <TabPanel>
                    {shelves['wantToRead'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId}/>})}
                </TabPanel>

            </TabPanels>
        </Tabs>
    </>)
}