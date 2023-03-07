import {Button, Select, Spinner, useToast} from '@chakra-ui/react';
import {useQuery, useQueries} from '@tanstack/react-query'
import React, {useEffect, useMemo, useState} from 'react'
import { Link } from 'react-router-dom';
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {OneRowInBookListAdmin} from "./OneRowInBookListAdmin";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {log} from "util";
import axios from "axios";
import {SpinnerComponent} from "../../SpinnerComponent";
export interface Author {
    key:string,
}
const getBooksPaginated = async (page:number, amountToShow:number) => {
    const res = await axios.get(`http://localhost:3001/books?page=${page}&booksPerPage=${amountToShow}`,{
        withCredentials:true
    });
    return res.data
}
export const AdminBookList = () => {
    const [value, setValue] = useState('');
    const axiosPrivate = useAxiosPrivate()
    const toast = useToast();
    const [amountOfEntities, setAmountOfEntities] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [{data:books, refetch}, {data:allBooks, status:allBooksStatus, isLoading:allBooksLoading}] = useQueries({
        queries:[
            {
                queryKey:['books', {currentPage}],
                keepPreviousData:true,
                queryFn: () => getBooksPaginated(currentPage,amountOfEntities )
            },

            {
                queryKey:['books'],
                keepPreviousData:true,
                queryFn:async () => {
                    const res =  await axiosPrivate.get('http://localhost:3001/books');
                    console.log(res.data)
                    return res.data
                }
            }
        ],

    });
    console.log(books)
    if(!allBooks)return <SpinnerComponent/>
    const countPages = () => {
            let pages: number[] = []
            for(let i = 0; i < allBooks.length / amountOfEntities; i++){
                pages.push(i+1)
            }
            return pages
    };
    const pages = countPages();
    const getBooksSearch = debounce(async (value:string) =>  {
        if (!value){
            return
        }

        console.log(value)
            const res = await axiosPrivate.post(`http://localhost:3001/bookAdmin/search/${value}`,JSON.stringify({value}));
            // setBooks(res.data)

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

    if(allBooksLoading) return <Spinner/>
    return (<>
        <HomeNavAdmin/>
    <div className='pt-16'></div>

       <div className='w-screen  bg-[#fbfcff] pt-10'>
          <div className='w-[90%] mx-auto bg-white shadow-2xl rounded-xl relative'>
           <div className='w-[90%] mx-auto pt-[1rem]'>
               <header>
                   <div className='flex justify-between items-center pb-5'><p className='font-bold text-xl'>Book List</p><button className='focus:outline-2 focus:outline-black font-bold px-5 py-2
                text-white bg-black rounded-lg'><Link to='/addBook'>Add New Book</Link></button></div>
               </header>
               <div className='absolute left-0 right-0 h-[0.5px] bg-[#BBB]'></div>
               <div className='flex justify-center gap-1 items-center mt-2'>
                   <p className='font-medium'>Show</p><select className='ring-1 ring-teal-600 rounded-md px-1 py-0.5 appearance-none   focus:outline-blue-700' onChange={(e) => setAmountOfEntities(parseInt(e.target.value))}  autoComplete='off'  name="" id="" defaultChecked={true}>
                   <option    value="10" >10</option>
                   <option   value="20" >20</option>
                   <option   value="50" >50</option>
                   <option   value="100" >100</option>
               </select><p className='font-medium'>entries</p>
               </div>
               <label  className='flex gap-6 justify-center items-center pt-3'>
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
                       {books.map((book:any, i:number) => <OneRowInBookListAdmin key={i} book={book} i={i} refresh={refetch}/>)}
                       </tbody>
                   </table>
               </div>
               <div className='flex justify-center mt-2 mb-1'>Showing {(currentPage * amountOfEntities) - amountOfEntities + 1} to {currentPage * amountOfEntities > allBooks.length ? allBooks.length : currentPage* amountOfEntities} of {allBooks.length} entries</div>
                <div className='w-full h-10 flex justify-center items-center'>
                    <i
                        className="fa-solid fa-angle-left text-[#667574] mr-2" onClick={() => {
                        if(currentPage !== 1) setCurrentPage(currentPage - 1)}
                    }></i>
                    <ol className='flex gap-2 '>

                    {
                    pages.map((page:number) => <li className={`list-none px-2 py-0.5 ${currentPage === page && 'bg-blue-600'} text-black font-medium  rounded-sm`} onClick={() => setCurrentPage(page)}>{page}</li>)
                }

                    </ol>
                    <i
                        className="fa-solid fa-angle-right text-[#667574] ml-2 " onClick={() => {
                        if(currentPage < allBooks.length / amountOfEntities)
                            setCurrentPage(currentPage + 1)
                        }
                    }></i>
                </div>
           </div>
          </div>
       </div>
    </>)
}