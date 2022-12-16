import { Button } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
export interface Book {
    isbn :string,
    author:string,
    title:string,
}

export const AdminBookList = () => {
    const [books ,setBooks] = useState<Book[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/books');
            const data = await res.json();
            setBooks(data)
        })()
    },[])
    return (<>
        <HomeNavAdmin/>
    <div className='pt-20'></div>
        <div><Button><Link to='/addBook'>Add Book</Link></Button></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto '>
            <table className='h-[84px]  '>

                <tr className='h-16'>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6]'><p className='flex items-end h-5/6'>No</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Image</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Name</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Category</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Author</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Description</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='flex items-end h-5/6'>Action</p></th>
                </tr>

                <tbody>
                {books.map((book, i) => <tr className='h-16 font-normal text-[16px]'>
                    <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '>{book.title}</td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '>History</td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '>{book.author}</td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '>About mercenary named Beso</td>
                    <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center'><i
                        className="fa-solid fa-pen-to-square"></i>
                        <i className="fa-solid fa-trash"></i></div>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </>)
}