import { Select, useToast} from '@chakra-ui/react';
import { useQueries} from '@tanstack/react-query'
import React, {useEffect, useMemo, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import axios, {all} from "axios";
import {SpinnerComponent} from "../SpinnerComponent";
import { HomeNav } from '../Home/HomeNav';

import {useParams} from "react-router";

import {OneRowInBookList} from "./OneRowInBookList";
export interface Author {
        key:string,
}
const getBooksPaginated = async (page:number, amountToShow:number, searchValue:string, list:string, userId:string, sort:boolean, typeOfSort:string, arrow:string) => {
        console.log(list)
        const res = await axios.get(`http://localhost:3001/books/list?page=${page}&booksPerPage=${amountToShow}&searchValue=${searchValue}&list=${list}&id=${userId}&sort=${sort}&typeOfSort=${typeOfSort}&arrow=${arrow}`,{
                withCredentials:true
        });
        // if(sort && list){
        //         if(typeOfSort === 'rating' && arrow === 'desc'){
        //                 return res.data.sort((a:BookEntity,b:BookEntity) => a.rating < b.rating ? 1 : -1)
        //         }else if(typeOfSort ==='rating' && arrow === 'asc'){
        //                 return res.data.sort((a:BookEntity,b:BookEntity) => a.rating < b.rating ? -1 : 1)
        //         }
        // }
        return res.data
}
export const UserBookList = () => {
        const [value, setValue] = useState('');
        const axiosPrivate = useAxiosPrivate()
        const toast = useToast();
        const [searchParams, setSearchParams] = useSearchParams();
        const [list, setList] = useState<string>(searchParams.get('list') ?? '')
        const {userId} = useParams()
        const [loading ,setLoading] = useState<boolean>(false);
        const [sort, setSort] = useState(false);
        const [typeOfSort, setTypeOfSort] = useState('')
        const [amountOfEntities, setAmountOfEntities] = useState<number>(10);
        const [searchValue, setSearchValue] = useState('');
        const [arrow, setArrow] = useState<string>('none')
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [{data:books, refetch, isLoading}, {data:allBooks,refetch:refetchAll, status:allBooksStatus, isLoading:allBooksLoading}, {data:userData, refetch:refetchUser}] = useQueries({
                queries:[
                        {
                                queryKey:['books', {currentPage}],
                                keepPreviousData:true,
                                queryFn: () => getBooksPaginated(currentPage,amountOfEntities, searchValue, list, userId as string, sort, typeOfSort, arrow)
                        },

                        {
                                queryKey:['Books'],
                                keepPreviousData:true,
                                queryFn:async () => {
                                        const res =  await axiosPrivate.get('http://localhost:3001/books/list/all',{
                                                params:{
                                                        id:userId,
                                                        list:list,

                                                }
                                        });

                                        return res.data
                                }
                        },
                        {
                                queryKey:['user'],
                                queryFn:async () => {
                                        const res =  await axiosPrivate.get(`http://localhost:3001/user/${userId}`);
                                        return res.data
                                }
                        }
                ],

        });
        const refreshAll = () => {
                setCurrentPage(1);
                setLoading(true);
                refetch();
                refetchUser();
                refetchAll();
                setLoading(false)
        };
        useEffect(() => {


                searchParams.set('list', list);
        }, [list])
        useEffect(() => {
                refreshAll()
        }, [ amountOfEntities, list, searchValue, sort, arrow, userData]);
        if(isLoading || allBooksLoading)return <SpinnerComponent/>
        const countPages = () => {
                let pages: number[] = [];
                if(list && books.length < amountOfEntities){

                }
                if(searchValue && list !== '' ){
                        for(let i = 0; i < Math.ceil(books.length / amountOfEntities); i++){
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

        if(allBooksLoading || isLoading || !userData || loading || isLoading) return <SpinnerComponent/>
        return (<>
                <HomeNav/>
                <div className='pt-16'></div>

                <main className='  bg-[#fbfcff] pt-10 pb-20'>
                        <section className='w-[90%] mx-auto bg-white shadow-2xl rounded-xl relative '>
                                <div className='w-[90%] mx-auto pt-[1rem] pb-5'>
                                        <div className='flex items-center w-full flex-col gap-y-2 mb-5'>
                                                {Object.keys(userData?.lists).length > 0 ?<> <h2 className='text-3xl font-medium mt-4'>Pick a list</h2>
                                                    <Select width='250px' autoComplete='off' value={list}    onChange={(e) => setList(e.target.value)}>
                                                            <option value="" hidden disabled className='' defaultChecked={true}>
                                                                    Lists
                                                            </option>
                                                            {Object.keys(userData?.lists).map((key:string) => <option
                                                                value={key}>{key}</option>)}
                                                    </Select> </>: <h2 className='text-5xl font-bold'>There are no lists </h2>}
                                        </div>
                                        {list  && <> <div className='flex justify-center gap-1 items-center mt-2'>
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
                                                <th className={`py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] relative`}><p className='text-left'>Book Name</p><i className={`absolute bottom-2 right-2 text-xl cursor-pointer fa-solid ${arrow === 'none' ? 'fa-sort' : arrow==='desc' && typeOfSort ==='title' ? 'fa-sort-down': typeOfSort === 'title' && 'fa-sort-up' }`} onClick={() => {

                                                        setSort(true);
                                                        setTypeOfSort('title')
                                                        if(!sort && arrow === 'none'){
                                                                setArrow('desc')
                                                        }else if(sort && arrow === 'desc'){
                                                                setArrow('asc')
                                                        }else if(sort && arrow ==='asc'){
                                                                setSort(false);
                                                                setArrow('none');
                                                                setTypeOfSort('')
                                                        }
                                                }
                                                }></i></th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] relative'><p className='text-left'>Avg Book Rating</p>
                                                        <i className={`absolute right-2 bottom-2 fa-solid text-xl cursor-pointer ${arrow === 'none' ? 'fa-sort' : arrow==='desc' && typeOfSort ==='rating' ? 'fa-sort-down': typeOfSort === 'rating' && 'fa-sort-up' }`} onClick={() => {
                                                        setSort(true);
                                                        setTypeOfSort('rating');

                                                               if(!sort && arrow === 'none'){
                                                                       setArrow('desc')
                                                               }else if(sort && arrow === 'desc'){
                                                                       setArrow('asc')
                                                               }else if(sort && arrow ==='asc'){
                                                                       setSort(false);
                                                                       setArrow('none');
                                                                       setTypeOfSort('')
                                                               }

                                                        }
                                                        }></i>
                                                </th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Publishers</p></th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Category</p></th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] relative '><p className='text-left'>Book Author</p> <i className={`absolute right-2 bottom-2 fa-solid text-xl cursor-pointer ${arrow === 'none' ? 'fa-sort' : arrow==='desc' && typeOfSort ==='author' ? 'fa-sort-down': typeOfSort === 'author' && 'fa-sort-up' }`} onClick={() => {
                                                        setSort(true);
                                                        setTypeOfSort('author');

                                                        if(!sort && arrow === 'none'){
                                                                setArrow('desc')
                                                        }else if(sort && arrow === 'desc'){
                                                                setArrow('asc')
                                                        }else if(sort && arrow ==='asc'){
                                                                setSort(false);
                                                                setArrow('none');
                                                                setTypeOfSort('')
                                                        }

                                                }
                                                }></i></th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='text-left'>Book Description</p></th>
                                                <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '><p className='flex items-end h-5/6'>Action</p></th></tr></thead>

                                                <tbody>
                                        {books.map((book:any, i:number) => <OneRowInBookList key={i} book={book} i={i} refresh={refreshAll}/>)}

                                                </tbody>
                                                </table>
                                                </div> : <div className='font-bold text-2xl mx-auto flex justify-center'><h2 className='my-4'>List is empty</h2></div>}
                                        {books?.length === 0  ? null : <> <div className='flex justify-center mt-2 mb-1'>Showing {amountOfEntities >= allBooks && value === '' ? allBooks.length : (currentPage * amountOfEntities) - amountOfEntities + 1 } to {books.length >= amountOfEntities ? amountOfEntities : books.length < amountOfEntities ? currentPage > 1 ? books.length + amountOfEntities:books.length : allBooks.length} of {books.length < amountOfEntities ? books.length : allBooks.length} entries</div>
                                                <div className='w-full h-10 flex justify-center items-center '>
                                                <i
                                                className="fa-solid fa-angle-left text-[#667574] mr-2 p-2 hover:bg-[#ddd] cursor-pointer" onClick={() => {
                                                if(currentPage !== 1) {
                                                        setCurrentPage(currentPage - 1)
                                                        window.scrollTo({top:0, behavior:'smooth'});
                                                }
                                                }
                                        }></i>
                                                <ol className='flex gap-2 '>

                                        {
                                                pages.map((page:number) => <li className={`list-none px-2.5 py-1 ${currentPage === page && 'bg-blue-600 hover:bg-blue-600'} hover:bg-[#ddd] cursor-pointer p-2 text-black font-medium  rounded-sm`} onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({top:0, behavior:'smooth'})
                                                }}>{page}</li>)
                                        }

                                                </ol>
                                                <i
                                                className="fa-solid fa-angle-right text-[#667574] ml-2 hover:bg-[#ddd]  p-2 cursor-pointer" onClick={() => {

                                                if(amountOfEntities < allBooks.length && books.length >= amountOfEntities){
                                                        setCurrentPage(currentPage + 1);
                                                        window.scrollTo({top:0, behavior:'smooth'});
                                                }
                                        }
                                        }></i>
                                                </div>

                                                </>}
                                        </>}
                                </div>
                        </section>
                </main>
        </>)
}