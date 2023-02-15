import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {OneBookUser} from "./OneBookUser";
import {ShelfUser} from "./ShelfUser";
import ProgressBar from "@ramonak/react-progress-bar";
import {Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useLocation} from "react-router";
export const UserBooks = () => {
    const axiosPrivate = useAxiosPrivate();
    const [activeTab, setActiveTab] = useState('read')
    const {user} = useSelector((state: RootState) => state.user);
    const location = useLocation();
    const [shelves ,setShelves] = useState<{read:string[], wantToRead:string[], currentlyReading:string[]}>();
    const refresh = async() => {
        const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/books`)
        console.log(res.data, 111)
        setShelves(res.data)
    };

    useEffect(() => {
        refresh();
        location.state && setActiveTab(location.state)
    }, [location])
    if (!shelves){
        return <h1>1</h1>
    };
    const statuses = ['read', 'currentlyReading', 'wantToRead']
    return (<>

        <HomeNav/>
        <div className='pt-16'></div>
                <main className='w-screen flex justify-center flex-col '>
                    <div className="w-full h-auto  bg-[#053742]   text-[#E8F0F2] rounded-[2rem] ">
                        {/* Tab nav */}
                       <div className='flex w-full justify-center'>
                           <ul className="w-full my-auto   flex items-center justify-center border-2 border-[#39A2DB] rounded-[2rem] p-0">
                               <li className={`${activeTab === "read" ? "bg-[#39A2DB]" : ""} text-[14px] font-medium w-1/2  leading-[3.5rem] h-full list-none text-center cursor-pointer transition-all  duration-500 rounded-b-[2rem] rounded-t-[2rem] `} onClick={() => setActiveTab('read')}>Read</li>
                               <li className={`${activeTab === "currentlyReading" ? "bg-[#39A2DB]" : ""} text-[14px]  font-medium w-1/2 leading-[3.5rem] list-none text-center cursor-pointer transition-all  duration-500 rounded-b-[2rem] rounded-t-[2rem] `} onClick={() => setActiveTab('currentlyReading')}>Currently Reading</li>
                               <li className={`${activeTab === "wantToRead" ? "bg-[#39A2DB]" : ""} text-[14px] font-medium w-1/2 leading-[3.5rem] list-none text-center cursor-pointer transition-all  duration-500 rounded-b-[2rem] rounded-t-[2rem] `} onClick={() => setActiveTab('wantToRead')}>Want To Read</li>
                           </ul>
                       </div>

                    </div>
                    <div className="outlet ">
                        <ShelfUser key={activeTab} status={activeTab} refresh={refresh} shelves={shelves}/>
                    </div>



                </main>
    </>)
}