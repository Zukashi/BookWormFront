import { Button } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {OneRowInBookListAdmin} from "./OneRowInBookListAdmin";
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
}

export const AdminBookList = () => {
    const [books ,setBooks] = useState<Book[]>([]);
    const [value, setValue] = useState('');
    const refreshBooks = async () => {
        const res = await fetch('http://localhost:3001/books', {
            credentials:'include'
        });
        const data = await res.json();
        setBooks(data);

    }
    useEffect(() => {
        if(!value) {
            refreshBooks();
            return;
        };
        (async () => {
            const res = await fetch(`http://localhost:3001/bookAdmin/search/${value}`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({value})
            });
            const data = await res.json();
            setBooks(data)
        })()


    },[value]);
    useEffect(() => {
        refreshBooks()
    }, [])
    return (<>
        <HomeNavAdmin/>
    <div className='pt-20'></div>
        <div><Button><Link to='/addBook'>Add Book</Link></Button></div>
        <div className='flex gap-6 justify-center'><p>Search:</p><input className='outline-none ring-2 ring-teal-600 px-3 py-1.5' value={value} onChange={(e) => setValue(e.target.value)}/></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto '>
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
    </>)
}