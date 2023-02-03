import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {Button, Input, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {OneBookUser} from "./OneBookUser";

export const UserBooks = () => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((state: RootState) => state.user);
    const [shelves ,setShelves] = useState<{read:string[], wantToRead:string[], currentlyReading:string[]}>();

    const refresh = async() => {
        const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/books`)
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
                    <div className='flex'><Input placeholder='Search your reading log'/>
                        <Button>Submit</Button></div>
                    {shelves['read'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId} refresh={refresh} status={'read'} />})}
                </TabPanel>
                <TabPanel>
                    <div className='flex'><Input placeholder='Search your reading log'/>
                        <Button>Submit</Button></div>
                    {shelves['currentlyReading'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId} refresh={refresh} status={'currentlyReading'}/>})}
                </TabPanel>
                <TabPanel>
                    <div className='flex'><Input placeholder='Search your reading log'/>
                        <Button>Submit</Button></div>
                    {shelves['wantToRead'].map((bookId:string) => {
                        return <OneBookUser key={bookId} id={bookId} refresh={refresh} status='wantToRead'/>})}
                </TabPanel>

            </TabPanels>
        </Tabs>
    </>)
}