import {Button, useToast} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {OneRowInBookListAdmin} from "./OneRowInBookListAdmin";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {log} from "util";
export interface Author {
    key:string,
}
export interface Book {
    _id:string,
    isbn :string,
    author:string,
    title:string,
    publish_date: string,
    publishers?: string[],
    authors:{key:string,_id:string}[],
    subjects?:string[],
    subject_people?:string[],
    description:string,
    rating:number,
    sumOfRates:number,
    amountOfRates:number,
    imageSrc:string,
}

export const AdminBookList = () => {
    const [books ,setBooks] = useState<Book[]>([]);
    const [value, setValue] = useState('');
    const axiosPrivate = useAxiosPrivate()
    const toast = useToast();
    const refreshBooks = async () => {
        const res = await axiosPrivate.get('http://localhost:3001/books');
        setBooks(res.data);
    }
    const getBooksSearch = debounce(async (value:string) =>  {
        if (!value){
            refreshBooks()
            return
        }

        console.log(value)
            const res = await axiosPrivate.post(`http://localhost:3001/bookAdmin/search/${value}`,JSON.stringify({value}));
            setBooks(res.data)

    }, 300)
    function debounce (cb:any, delay=500){
        let timeout:any;
        return (...args:any) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }
    useEffect(() => {
        refreshBooks()
    }, []);
    return (<>
        <HomeNavAdmin/>
    <div className='pt-16'></div>

       <div className='w-screen h-screen bg-[#fbfcff] pt-10'>
          <div className='w-[90%] mx-auto bg-white shadow-2xl rounded-xl'>
           <div className='w-[90%] mx-auto'>
               <div><Button><Link to='/addBook'>Add Book</Link></Button></div>
               <label  className='flex gap-6 justify-center items-center'>
                   <p className=
                          'font-medium '>Search:</p><input className='outline-none ring-2 ring-teal-600 px-3 py-1.5 focus:outline-2 focus:ring-blue-600 '    onChange={(e) =>
                   getBooksSearch(e.target.value)}/>
               </label>
               <div className='overflow-x-auto max-w-[1000vw] w-full mx-auto '>
                   <table className='h-[84px] table-fixed  '>

                       <thead><tr className='h-16'>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6]'><p className='flex items-end h-5/6'>No</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Image</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Name</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Avg Book Rating</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Publishers</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Category</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Author</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Description</p></th>
                           <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='flex items-end h-5/6'>Action</p></th></tr></thead>

                       <tbody>
                       {books.map((book, i) => <OneRowInBookListAdmin key={i} book={book} i={i} refresh={refreshBooks}/>)}
                       </tbody>
                   </table>
               </div>
           </div>
          </div>
       </div>
    </>)
}