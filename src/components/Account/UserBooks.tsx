import React from 'react';
import {HomeNav} from "../Home/HomeNav";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

export const UserBooks = () => {
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
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>

            </TabPanels>
        </Tabs>
    </>)
}