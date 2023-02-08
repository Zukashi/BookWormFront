import { Button } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

import {OneRowInUserListAdmin} from "./OneRowInUserListAdmin";
import {HomeNavAdmin} from "../../Home/AdminHome/HomeNavAdmin";
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";

export interface Author {
    key:string,
}
export interface User {
    _id:string,
    username:string,
    firstName:string,
    lastName:string,
    age:number,
    city: string,
    base64Avatar:string,
}

export const AdminUserList = () => {
    const [users ,setUsers] = useState<User[]>([]);
    const [value, setValue] = useState('');
    const axiosPrivate = useAxiosPrivate()
    const refreshUsers = async () => {
        const res = await axiosPrivate.get('http://localhost:3001/user/users');
        setUsers(res.data);

    };
    const getUsersSearch = debounce(async (value:string) =>  {
        if (!value){
            refreshUsers()
            return
        }

        const res = await axiosPrivate.post(`http://localhost:3001/user/search/${value}`,JSON.stringify({value}))
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
        refreshUsers()
    }, [])
    return (<>
        <HomeNavAdmin/>
        <div className='pt-20'></div>
        <div className='flex gap-6 justify-center'><p>Search:</p><input className='outline-none ring-2 ring-teal-600 px-3 py-1.5'  onChange={(e) =>{
            setValue(value)
            return getUsersSearch(e.target.value)}
        }/></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto '>
            <table className='h-[84px] table-fixed  '>

                <thead><tr className='h-16'>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6]'><p className='flex items-end h-5/6'>No</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>User Image</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Username</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>First Name</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Last Name</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>City</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Age</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='flex items-end h-5/6'>Actions</p></th>
                </tr></thead>

                <tbody>
                {users.map((user, i) => <OneRowInUserListAdmin key={i} user={user} i={i} refresh={refreshUsers}/>)}
                </tbody>
            </table>
        </div>
    </>)
}