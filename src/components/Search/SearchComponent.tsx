import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSearchParams} from "react-router-dom";
import { HomeNav } from '../Home/HomeNav';
import {useForm} from "react-hook-form";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {SpinnerComponent} from "../../SpinnerComponent";
import {OneBookHome} from "../Home/OneBook";
import {useInView} from "react-intersection-observer";
import {useBookSearch} from "./useBookSearch";
import { Spinner } from '@chakra-ui/react';
import {OneBookOlSearch} from "./OneBookOlSearch";
function debounce (cb:any, delay=500){
    let timeout:any;
    return (...args:any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}
export const SearchComponent = () => {
    const axiosPrivate = useAxiosPrivate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(1);
    const { ref, inView } = useInView();
    const [query ,setQuery] = useState(searchParams.get('q') ?? '');

    const [books ,setBooks] = useState<BookEntity[] | null>(null);
    const [category, setCategory] = useState('title');
    const [instantInputUpdate, setInstantInputUpdate] = useState(searchParams.get('q') ?? '')
    const onChange = debounce(async (value:string) => {
            await setQuery(value);
            await setPageNumber(1)
    }, 400);

    const {books:olBooks, loading:openLibraryLoading, hasMore, error} = useBookSearch(query,pageNumber);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            console.log(query)
            const res = await axiosPrivate.get(`http://localhost:3001/search?q=${query}&category=${category}`)
            setBooks(res.data)
            setLoading(false)

        })()
    }, [])
    const onSubmit = async (e:any) => {
        e.preventDefault()
        setLoading(true);
        searchParams.set('q', query)
        const res = await axiosPrivate.get(`http://localhost:3001/search?q=${query}&category=${category}`);
        setBooks(res.data);
        setLoading(false)
    }

    // useEffect(() => {
    //     console.log(1235555)
    //     if(inView){
    //         void fetchNextPage()
    //     }
    // }, [inView]);
    console.log(books)

    return (<>
    <HomeNav/>
        <div className='pt-16'></div>

        <div className='w-full   sm:max-w-lg sm:mx-auto'>
            <header className='hidden sm:block text-2xl font-bold  mt-2 mb-3 w-full'>Search</header>
            <form className='bg-[#eee] py-2 px-2  mx-auto  w-full' onSubmit={onSubmit} autoComplete={'off'}>
               <div className='flex relative'>
                   <input type="text" value={instantInputUpdate}  onChange={(e) => {
                       onChange(e.target.value);
                       setInstantInputUpdate(e.target.value)
                   }
                   } className='appearance-none   focus:border-transparent rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-black' placeholder='Search' />
                   <i className='fas fa-search absolute text-xl right-2 top-1/2 px-2 py-1 -translate-y-1/2' onClick={onSubmit}></i>
               </div>
                <div className='mt-2 flex gap-2 ml-1'>
                    <label htmlFor="field-rain" className='flex items-center'>
                        <input
                            onChange={(e) => setCategory(e.target.value)}
                            checked={category === 'title' ? true : false}
                            type="radio"
                            value="title"
                            id="field-rain"
                        />
                         <p className='ml-1'>title</p>
                    </label>
                    <label htmlFor="field-wind" className='flex items-center'>
                        <input
                            onChange={(e) => setCategory(e.target.value)}
                            checked={category === 'author' ? true : false}
                            type="radio"
                            value="author"
                            id="field-wind"
                        />
                        <p className='ml-1'>author</p>
                    </label>
                </div>
            </form>

        </div>
        <main>
            {books && <section className={`${(books.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * books.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
                {books?.map((book:BookEntity, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
            </section>}
            {
                query.length > 0 && <><h2 className='text-3xl text-center w-full'>Open Library Books</h2>
                    {openLibraryLoading && <div className='flex w-full justify-center mt-10'>
                        <Spinner size='xl'/>
                    </div>}<section className='mt-10 flex items-center flex-col'>
                        {olBooks.map((book:any, i) => {
                            if(typeof book.isbn === 'object') {
                                if( book.isbn[0].length >= 10){
                                    return <OneBookOlSearch key={i} book={book} refresh={() => null}/>
                                }
                            }})}
                    </section></>
            }

        </main>
    </>)
}