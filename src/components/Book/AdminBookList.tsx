import { Select, useToast} from '@chakra-ui/react';
import { useQueries} from '@tanstack/react-query'
import React, {useEffect, useMemo, useState} from 'react'
import { Link } from 'react-router-dom';
import {OneRowInBookListAdmin} from "./OneRowInBookListAdmin";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import axios from "axios";
import {SpinnerComponent} from "../SpinnerComponent";
import { HomeNav } from '../Home/HomeNav';
export interface Author {
    key:string,
}
const getBooksPaginated = async (page:number, amountToShow:number, searchValue:string) => {

    const res = await axios.get(`http://localhost:3001/books?page=${page}&booksPerPage=${amountToShow}&searchValue=${searchValue}`,{
        withCredentials:true
    });
    return res.data
}
export const AdminBookList = () => {
    const [value, setValue] = useState('');
    const axiosPrivate = useAxiosPrivate()
    const toast = useToast();
    const [amountOfEntities, setAmountOfEntities] = useState<number>(10);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(amountOfEntities)
    const [{data:books, refetch, isLoading}, {data:allBooks, status:allBooksStatus, isLoading:allBooksLoading}] = useQueries({
        queries:[
            {
                queryKey:['books', {currentPage}],
                keepPreviousData:true,
                queryFn: () => getBooksPaginated(currentPage,amountOfEntities, searchValue)
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
    useEffect(() => {
        refetch()
    }, [searchValue, amountOfEntities])
    if(!allBooks)return <SpinnerComponent/>
    const countPages = () => {
            let pages: number[] = []
            if(searchValue ){
                for(let i = 0; i <= Math.floor(books.length / amountOfEntities); i++){
                    pages.push(i+1)
                }
                return pages
            }
        for(let i = 0; i < Math.ceil(allBooks.length / amountOfEntities); i++){
            pages.push(i+1)
        }
        return pages
    };

    const pages = countPages();
    const getBooksSearch = debounce(async (value:string) =>  {

        await setSearchValue(value)

            // const res = await axiosPrivate.post(`http://localhost:3001/bookAdmin/search/${value}`,JSON.stringify({value}));
            // setBooks(res.data)

    }, 300);

    function debounce (cb:any, delay=500){
        let timeout:any;
        return (...args:any) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }

    if(allBooksLoading || isLoading) return <SpinnerComponent/>
    return (<>
        <HomeNav/>
    <div className='pt-16'></div>

       <main className='  bg-[#fbfcff] pt-10'>
          <section className='w-[90%] mx-auto bg-white shadow-2xl rounded-xl relative '>
           <div className='w-[90%] mx-auto pt-[1rem] pb-5'>
               <header>
                   <div className='flex justify-between items-center pb-5'><p className='font-bold text-xl'>Book List</p><Link to={'/addBook'} className='focus:outline-2 focus:outline-black font-bold px-5 py-2
                text-white bg-black rounded-lg'><p>Add New Book</p></Link></div>
               </header>
               <div className='absolute left-0 right-0 h-[0.5px] bg-[#BBB]'></div>

               <div className='flex justify-center gap-1 items-center mt-2'>
                   <p className='font-medium'>Show</p><Select className=' appearance-none  font-medium  ' width={'90px'} onChange={(e) =>{
                   setCurrentPage(1)
                   setAmountOfEntities(parseInt(e.target.value));
                   }
               }  autoComplete='off'  name="" id="" defaultChecked={true}>
                   <option    value="10"  >10</option>
                   <option   value="20" >20</option>
                   <option   value="50" >50</option>
                   <option   value="100" >100</option>
               </Select><p className='font-medium'>entries</p>
               </div>
               <div  className='flex gap-6 justify-center items-center pt-3'><input placeholder='Search here...' className='mb-4 px-4 py-1  ring-1 rounded-md ring-[#555] px-2 '    onChange={(e) =>
                   getBooksSearch(e.target.value)}/>
               </div>
               {books?.length > 0 ? <div className='overflow-x-auto max-w-[1000vw] w-full mx-auto '>
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
               </div> : <div className='font-bold text-2xl mx-auto flex justify-center'><h2 className='my-4'>Book not found</h2></div>}
               {books?.length === 0 || amountOfEntities >= allBooks.length ? null : <> <div className='flex justify-center mt-2 mb-1'>Showing {amountOfEntities >= allBooks && value === '' ? allBooks.length : (currentPage * amountOfEntities) - amountOfEntities + 1 } to {amountOfEntities >= books.length ? currentPage === pages.at(-1) && pages.length > 1 ? allBooks.length : books.length : currentPage * amountOfEntities <= books.length ? ((currentPage * amountOfEntities) - amountOfEntities  + amountOfEntities): currentPage *  amountOfEntities - books.length} of {allBooks.length} entries</div>
                   <div className='w-full h-10 flex justify-center items-center '>
                   <i
                   className="fa-solid fa-angle-left text-[#667574] mr-2 p-2 hover:bg-[#ddd] cursor-pointer" onClick={() => {
                   if(currentPage !== 1) {
                       setCurrentPage(currentPage - 1)}   window.scrollTo({top:0, behavior:'smooth'});
                   }
               }></i>
                   <ol className='flex gap-2 '>

               {
                   pages.map((page:number) => <li className={`list-none px-2.5 py-1 ${currentPage === page && 'bg-blue-600 hover:bg-blue-600'} hover:bg-[#ddd] cursor-pointer p-2 text-black font-medium  rounded-sm`} onClick={() => {
                       setCurrentPage(page);
                       window.scrollTo({top:0, behavior:'smooth'});
                   }}>{page}</li>)
               }

                   </ol>
                   <i
                   className="fa-solid fa-angle-right text-[#667574] ml-2 hover:bg-[#ddd]  p-2 cursor-pointer" onClick={() => {

                   if((amountOfEntities !== 10 && currentPage < books.length / amountOfEntities) || (searchValue && currentPage < books.length / amountOfEntities)){
                       setCurrentPage(currentPage + 1)
                       window.scrollTo({top:0, behavior:'smooth'});
                   }else if(!searchValue ? currentPage < allBooks.length / amountOfEntities : currentPage < Math.floor(books.length / amountOfEntities)){
                       setCurrentPage(currentPage + 1)}
                       window.scrollTo({top:0, behavior:'smooth'});
               }
               }></i>
                   </div>

               </>}
           </div>
          </section>
       </main>
    </>)
}