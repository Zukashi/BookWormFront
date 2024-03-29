import React, {useEffect, useState} from 'react'

import {OneRowInUserListAdmin} from "./OneRowInUserListAdmin";
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";

import {HomeNav} from "../../Home/HomeNav";
import {SpinnerComponent} from "../../SpinnerComponent";
import {apiUrl} from "../../../config/api";
import { Spinner } from '@chakra-ui/react';

export interface Author {
    key:string,
}

export const AdminUserList = () => {
    const [users ,setUsers] = useState<any[]>([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()
    const refreshUsers = async () => {
        const res = await axiosPrivate.get(`${apiUrl}/user/users`);
        setUsers(res.data);
        setLoading(false)
    };
    const getUsersSearch = debounce(async (value:string) =>  {
        if (!value){
            void refreshUsers()
            return
        }

        const res = await axiosPrivate.post(`${apiUrl}/user/search/${value}`,JSON.stringify({value}))
        setUsers(res.data)

    }, 350);
    function debounce (cb:any, delay=500){
        let timeout:any;
        return (...args:any) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }

    console.log('rerender')
    useEffect(() => {
        void refreshUsers()
    }, []);
    if(loading){
        return  <SpinnerComponent/>
    }
    return (<>
        <div className='pt-20'></div>
        <div className='flex gap-6 justify-center items-center'><input placeholder='Search ...' className='shadow-lg pr-8  pl-2 py-1.5 rounded-xl ring-1 w-80'  onChange={(e) =>{
            setValue(value)
            return getUsersSearch(e.target.value)}
        }/></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto max-w-[1200px] mt-6 '>
            <table className='h-[84px] mx-auto  '>

                <thead><tr className='h-16'>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6]'><p className='flex items-end h-5/6'>No</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>User Image</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>Username</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>First Name</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>Last Name</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>City</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='text-left'>Age</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6] '><p className='flex items-end h-5/6'>Actions</p></th>
                </tr></thead>

                <tbody>
                {users.map((user, i) => <OneRowInUserListAdmin key={i} user={user} i={i} refresh={refreshUsers}/>)}
                </tbody>
            </table>
        </div>
    </>)
}