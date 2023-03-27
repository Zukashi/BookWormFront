import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {ShelfUser} from "./ShelfUser";
import 'react-tabs/style/react-tabs.css';
import {useSearchParams} from "react-router-dom";
export const UserBooks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('status') ? searchParams.get('status') as string : 'read'  )

    useEffect(() => {

        setSearchParams({
            status:activeTab

        }
        )
    }, [activeTab])
    return (<>

        <HomeNav/>
        <div className='pt-16'></div>
                <main className='w-screen flex justify-center flex-col '>
                    <div className="w-full h-auto  bg-[#053742]   text-[#E8F0F2] ">
                        {/* Tab nav */}
                       <div className='flex w-full justify-center'>
                           <ul className="w-full my-auto   flex items-center justify-center     p-0">
                               <li className={`${activeTab === "read" ? "bg-[#39A2DB] text-[#3A017E]" : ""} text-[14px] font-medium w-1/2  leading-[3.5rem] h-full list-none text-center cursor-pointer transition-all  duration-500 border-blue-700 border-r-4 `} onClick={() => setActiveTab('read')}>Read</li>
                               <li className={`${activeTab === "currentlyReading" ? "bg-[#39A2DB] text-[#3A017E]" : ""} border-blue-700 border-r-4 text-[14px]   font-medium w-1/2 leading-[3.5rem] list-none text-center cursor-pointer transition-all  duration-500  `} onClick={() => setActiveTab('currentlyReading')}>Currently Reading</li>
                               <li className={`${activeTab === "wantToRead" ? "bg-[#39A2DB] text-[#3A017E]" : ""} text-[14px] font-medium w-1/2 leading-[3.5rem] list-none text-center cursor-pointer transition-all  duration-500  `} onClick={() => setActiveTab('wantToRead')}>Want To Read</li>
                           </ul>
                       </div>

                    </div>
                    <div className="outlet ">
                        <ShelfUser key={activeTab} status={activeTab} />
                    </div>



                </main>
    </>)
}