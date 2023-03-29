import React, {useEffect, useRef, useState, useCallback} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSearchParams} from "react-router-dom";
import { HomeNav } from '../Home/HomeNav';
import {OneBookHome} from "../Home/OneBook";
import {useInView} from "react-intersection-observer";
import {useBookSearch} from "./useBookSearch";
import { Spinner } from '@chakra-ui/react';
import {OneBookOlSearch} from "./OneBookOlSearch";
import {SpinnerComponent} from "../SpinnerComponent";
import {ToastContainer} from "react-toastify";
import {apiUrl} from "../../config/api";
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
    const [loading, setLoading] = useState(false);
    const [query ,setQuery] = useState(searchParams.get('q') ?? '');
    const {books:olBooks, loading:openLibraryLoading, hasMore, error} = useBookSearch(query,pageNumber);
    const observer = useRef<any>();
    const lastOlBookElement = useCallback((node:any) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting && hasMore){
                    setPageNumber((prev) => prev + 1)
                }
        });
        if(node) observer.current.observe(node)

    },[loading, hasMore])


    const [books ,setBooks] = useState<any[] | null>(null);
    const [category, setCategory] = useState('title');
    const [instantInputUpdate, setInstantInputUpdate] = useState(searchParams.get('q') ?? '')
    const onChange = debounce(async (value:string) => {
            await setQuery(value);
            await setPageNumber(1);
    }, 400);

    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get(`${apiUrl}/search?q=${query}&category=${category}`)
            setBooks(res.data)
            setLoading(false)

        })()
    }, [])
    const onSubmit = async (e:any) => {
        e.preventDefault()
        searchParams.set('q', query);
        console.log(query)

        if(!query){
            const res = await axiosPrivate.get(`${apiUrl}/books`);
            setBooks(res.data);

        }else{
            const res = await axiosPrivate.get(`${apiUrl}/search?q=${e.target.value}&category=${category}`);
            setBooks(res.data);

        }

    }

    if(!olBooks || !books) return <SpinnerComponent/>
    return (<>
    <HomeNav/>
        <ToastContainer/>
        <div className='pt-16'></div>

        <div className='w-full   sm:max-w-lg sm:mx-auto'>
            <header className='hidden sm:block text-2xl font-bold  mt-2 mb-3 w-full'>Search</header>
            <form className='bg-[#eee] py-2 px-2  mx-auto  w-full' onSubmit={onSubmit} autoComplete={'off'}>
               <div className='flex relative'>
                   <input type="text" value={instantInputUpdate}  onChange={(e) => {
                       onChange(e.target.value);
                       void onSubmit(e);
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
            { books.length > 0 &&
                <>
                    <h2 className='text-3xl lg:text-5xl text-center w-full mt-3'>Our Books</h2>
                    {loading ?<div className='flex w-full justify-center py-20 '>
                        <Spinner size='xl'/>
                    </div>: <>{books && <section className={`${(books.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * books.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
                        {books?.map((book:any, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
                    </section>}</>}</>
            }
            {
                query.length > 0 && <><h2 className='text-3xl lg:text-5xl text-center w-full my-10'>Open Library Books</h2>
                    {openLibraryLoading && <div className='flex w-full justify-center py-20 pb-40'>
                        <Spinner size='xl'/>
                    </div>}<section className={`${(olBooks.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * olBooks.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto relative mb-96'}`}>
                        {olBooks.map((book:any, i) => {
                            if(olBooks.length === i + 1)  {
                                return <>
                                    <OneBookOlSearch   key={i} book={book} refresh={() => null}/> <div ref={lastOlBookElement} className='my-6 absolute -bottom-40 left-1/2 -translate-x-1/2'><Spinner size='xl'/></div></>
                            }
                            return <OneBookOlSearch  key={i} book={book} refresh={() => null}/>


                            })}

                    </section></>
            }

        </main>
    </>)
}