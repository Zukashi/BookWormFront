import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input, Select, Spinner} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {OneBookHome} from "../Home/OneBook";
import shadows from "@mui/material/styles/shadows";

export const CategoryBooks = () => {
    const {register, handleSubmit, formState:{errors}, watch,    formState,
        formState: { isValidating }} = useForm<{genres:string, author:string, year: string}>({
        mode:'onChange',
        defaultValues:{
            genres:'',
            author:'',
            year:'',
        }
    });
    const [defaultAuthorsYearsGenres, setDefaultAuthorsYearsGenres] = useState<{genres:string[],years:string[],authors:string[]}>({
        genres:[],
        years:[],
        authors:[]
    })
    const [selectedValue, setSelectedValue] = useState('');
    const years = [2017, 2016, 2015];
    const authors = ['JK Rowling', 'Andrzej Sapkowski'];
    const axiosPrivate = useAxiosPrivate();
    const [genres, setGenres] = useState<string[]>([])
    const [books ,setBooks] = useState<null | any>()
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get('http://localhost:3001/books')
            setBooks(res.data)
            const res2 = await axiosPrivate.get('http://localhost:3001/genres');
            console.log(res2.data)
            const newGenres = res2.data.genres.filter((genre:string) => genre !== '')
            const newYears = res2.data.years.filter((year:string) => year !== '')
            const newAuthors = res2.data.authors.filter((author:string) => author !== '')
            setDefaultAuthorsYearsGenres((prevState) => ({
                ...prevState,
                genres:newGenres,
                authors:newAuthors,
                years:newYears,
            }))
        })()
    }, []);

    const data = watch();
    React.useEffect(() => {
        if (formState.isValid && !isValidating) {
            console.log(data);
        }
    }, [formState, data, isValidating]);
    const onSubmit = (data:any) => {

        console.log(data)
    }
    if(!books) return <Spinner/>
    return (<>
   <main>
       <div className='pt-20'></div>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>
                 <h1 className='font-bold text-[2rem] text-center'>Search by book name</h1>

                     <form handleSubmit={onSubmit} className='flex flex-col w-full gap-4' >
                         <Select  {...register('genres')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Genres
                             </option>
                             {defaultAuthorsYearsGenres.genres?.map((genre) => <option value={genre} key={genre}>{genre}</option>)}
                         </Select>
                         <Select  {...register('year')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Year
                             </option>
                             {defaultAuthorsYearsGenres.years.map((year) => <option value={year}>{year}</option>)}
                         </Select>
                         <Select  {...register('author')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Author
                             </option>
                             {defaultAuthorsYearsGenres.authors.map((author) => <option value={author}>{author}</option>)}
                         </Select>
                     </form>
                    <div className='flex justify-between'>
                        <Input placeholder='search here' width='90%'></Input><button className='bg-black font-bold text-white text-1xl px-4 py-2 rounded-xl '>Search</button>
                    </div>

       </section>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>
           {books.map((book:any, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null}/>)}

       </section>
   </main>


    </>)
}