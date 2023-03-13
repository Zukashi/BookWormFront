import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input, Select, Spinner} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {OneBookHome} from "../Home/OneBook";
import shadows from "@mui/material/styles/shadows";
import {isEqual} from "lodash";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';

export const CategoryBooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState<number>(4)
    const [defaultAuthorsYearsGenres, setDefaultAuthorsYearsGenres] = useState<{genres:string[],years:string[],authors:string[]}>({
        genres:[],
        years:[],
        authors:[]
    });
    const [filterBooksBoolean, setFilterBooksBoolean] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [books ,setBooks] = useState<any[]>([]);
    const [form, setForm] = useState({
        genres:'',
        year:'',
        author:'',
        search:'',

    })
    const [loading,setLoading] = useState(true)
    const onChange = async (value:string, field:string) => {
        await setForm((prev) => ({
            ...prev,
            [field]:value
        }) );
        setFilterBooksBoolean(true)
    }
    useEffect(() => {
       (async() => {
            const res  = await axiosPrivate.post('http://localhost:3001/filterBooks', JSON.stringify(form));
            setBooks(res.data)
        })();
       setCurrentPage(1)
    }, [form]);
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get('http://localhost:3001/books')
            setBooks(res.data)
            const res2 = await axiosPrivate.get('http://localhost:3001/genres');
            console.log(res2.data)
            const newGenres = res2.data.genres.filter((genre:string) => genre !== '');
            const removeDuplicatesGenres = [...new Set(newGenres)] as string[]
            const newYears = res2.data.years.filter((year:string) => year !== '')
            const removeDuplicatesYears = [...new Set(newYears)] as string[]
            console.log(removeDuplicatesGenres)
            const newAuthors = res2.data.authors.filter((author:string) => author !== '')
            const removeDuplicatesAuthors = [...new Set(newAuthors)] as string[]
            setDefaultAuthorsYearsGenres((prevState) => ({
                ...prevState,
                genres:removeDuplicatesGenres,
                authors:removeDuplicatesAuthors,
                years:removeDuplicatesYears,
            }))
            setLoading(false)
        })()
    }, []);
    //@TODO FILTER BOOKS PROPERLY
    const selectPageHandler = (page:number) => {
        console.log(page)
        if(page  >= 1 &&  page<=Math.ceil(books.length / 2) && page !== currentPage)
        setCurrentPage(page)
    }

    if(loading) return <Spinner/>
    return (<>
   <main className='bg-[#F5F5F5] min-h-screen'>
       <div className='pt-20'></div>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>
                 <h1 className='font-bold text-[2rem] text-center'>Search by book name</h1>

                     <form className='flex  flex-col w-full gap-4 sm:flex sm:flex-row sm:w-3/4 sm:mx-auto' >
                         <select  className='w-full rounded-md border-[#eee] px-2 py-2' value={form.genres} onChange={(e) => onChange(e.target.value, 'genres')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Genres
                             </option>
                             {defaultAuthorsYearsGenres.genres?.map((genre,i) => <option value={genre} key={genre}>{genre}</option>)}
                         </select>
                         <select className='w-full rounded-md border-[#eee] px-2 py-2' value={form.year}  onChange={(e) => onChange(e.target.value,'year')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Year
                             </option>
                             {defaultAuthorsYearsGenres.years.map((year, i) => <option key={i} value={year}>{year}</option>)}
                         </select>
                         <select className='w-full rounded-md border-[#eee] px-2 py-2' value={form.author}  onChange={(e) => onChange(e.target.value, 'author')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Author
                             </option>
                             {defaultAuthorsYearsGenres.authors.map((author, i ) => <option key={i} value={author}>{author}</option>)}
                         </select>
                     </form>
                    <div className='flex justify-between sm:w-2/3 sm:mx-auto gap-2'>
                        <input value={form.search} className='w-3/4 ring-1 rounded-md ring-[#eee] px-2' onChange={(e) => onChange(e.target.value, 'search')} placeholder='Search here...' ></input><button className='bg-black font-bold text-white text-1xl px-4 py-2 rounded-xl '>Search</button>
                        <button className="hidden sm:block py-2 rounded-xl bg-[#ddd] px-5" onClick={() => setForm({  genres:'',
                            year:'',
                            author:'',
                            search:'',})}>Clear</button>
                    </div>
           <button className="sm:hidden bg-[#ccc] py-2 rounded-xl"onClick={() => setForm({  genres:'',
               year:'',
               author:'',
               search:'',})}>Clear</button>

       </section>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-[97%] bg-white mt-4 pb-4 rounded-lg md:w-[95%] '>
           <div className='flex flex-wrap justify-around w-full   md:justify-items-center sm:grid sm:grid-cols-2  lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'>
               { books.slice(currentPage * perPage - perPage,currentPage * perPage).map((book:BookEntity, i:number) => <OneBookHome key={i}   book={book} refresh={() =>  null}/>)}
           </div>
           {books.length < 1 && filterBooksBoolean && <span className='font-bold text-[2rem] mx-auto mt-[1rem]'>Book not found</span>}
           { books.length >= 1 &&
               <div className='flex  gap-2 items-center  justify-center my-4 h-3'>
                   <div className=' px-2 py-0.5 cursor-pointer  hover:bg-[#D2EAE9]' onClick={() => selectPageHandler(currentPage - 1)}><i
                       className="fa-solid fa-angle-left text-[#667574] "></i></div>
                   {[...Array(Math.ceil(books.length/perPage))].map((_, i) => <div className={`cursor-pointer hover:bg-[#ddd] px-2 py-0.5 ${currentPage === i + 1 && 'bg-[#4899E7] hover:bg-[#4899e7] cursor-pointer'}`}  key={i} onClick={() => setCurrentPage(i+1)}>{i+1}</div>)}
                   <div className=' px-2 py-0.5 cursor-pointer  hover:bg-[#D2EAE9]' onClick={() => selectPageHandler(currentPage + 1)}><i
                       className="fa-solid fa-angle-right text-[#667574] "></i></div>
               </div>
           }
       </section>
   </main>
        {/*flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto*/}

    </>)
}