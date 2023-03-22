import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSearchParams} from "react-router-dom";
import { HomeNav } from './HomeNav';
import {useForm} from "react-hook-form";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {SpinnerComponent} from "../../SpinnerComponent";
import {OneBookHome} from "./OneBook";

export const SearchComponent = () => {
    const axiosPrivate = useAxiosPrivate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryOfSearch, setCategoryOfSearch] = useState('title');
    const [books ,setBooks] = useState<BookEntity[] | null>(null);
    const [loading, setLoading] = useState(true)
    const {register, handleSubmit, getValues} = useForm(
        {defaultValues:{
                searchValue:searchParams.get('q'),
                typeOfSearch:'title'
            }}
    )
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/search?q=${searchParams.get('q')}&category=${getValues('typeOfSearch')}`)
            setBooks(res.data)
            setLoading(false)

        })()
    }, [])
    const onSubmit = async () => {
        setLoading(true)
        const res = await axiosPrivate.get(`http://localhost:3001/search?q=${getValues('searchValue')}&category=${getValues('typeOfSearch')}`);
        setBooks(res.data);
        setLoading(false)
    }
    if(loading) return <SpinnerComponent/>
    return (<>

    <HomeNav/>
        <div className='pt-16'></div>

        <div className='w-full   sm:max-w-lg sm:mx-auto'>
            <header className='hidden sm:block text-2xl font-bold  mt-2 mb-3 w-full'>Search</header>
            <form className='bg-[#eee] py-2 px-2  mx-auto  w-full' onSubmit={onSubmit}>
               <div className='flex relative'>
                   <input type="text" {...register('searchValue')} className='appearance-none   focus:border-transparent rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-black' placeholder='Search' />
                   <i className='fas fa-search absolute text-xl right-2 top-1/2 px-2 py-1 -translate-y-1/2' onClick={onSubmit}></i>
               </div>
                <div className='mt-2 flex gap-2 ml-1'>
                    <label htmlFor="field-rain" className='flex items-center'>
                        <input
                            {...register("typeOfSearch")}
                            type="radio"
                            value="title"
                            id="field-rain"
                        />
                         <p className='ml-1'>title</p>
                    </label>
                    <label htmlFor="field-wind" className='flex items-center'>
                        <input
                            {...register("typeOfSearch")}
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
            {books && <div className={`${(books.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * books.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
                {books?.map((book:BookEntity, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
            </div>}
        </main>
    </>)
}