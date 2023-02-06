import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input, Select, Spinner} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {OneBookHome} from "../Home/OneBook";
import shadows from "@mui/material/styles/shadows";
import {isEqual} from "lodash";

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
    });
    const [filterBooksBoolean, setFilterBooksBoolean] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [books ,setBooks] = useState<null | any>();
    const [form, setForm] = useState({
        genres:'',
        year:'',
        author:'',
        search:'',

    })
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
        })()
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
            function removeDuplicateWords(arr: string[]): string[] {
                return arr.filter(word => !arr.some(existingWord => existingWord.includes(word) && existingWord !== word));
            }
            const newArr = removeDuplicateWords(newGenres);
            console.log(newArr)
            const newAuthors = res2.data.authors.filter((author:string) => author !== '')
            const removeDuplicatesAuthors = [...new Set(newAuthors)] as string[]
            console.log(res2.data)
            setDefaultAuthorsYearsGenres((prevState) => ({
                ...prevState,
                genres:removeDuplicatesGenres,
                authors:removeDuplicatesAuthors,
                years:removeDuplicatesYears,
            }))
        })()
    }, []);
    //@TODO FILTER BOOKS PROPERLY


    if(!books) return <Spinner/>
    return (<>
   <main>
       <div className='pt-20'></div>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>
                 <h1 className='font-bold text-[2rem] text-center'>Search by book name</h1>

                     <form className='flex flex-col w-full gap-4' >
                         <Select value={form.genres} onChange={(e) => onChange(e.target.value, 'genres')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Genres
                             </option>
                             {defaultAuthorsYearsGenres.genres?.map((genre) => <option value={genre} key={genre}>{genre}</option>)}
                         </Select>
                         <Select value={form.year}  onChange={(e) => onChange(e.target.value,'year')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Year
                             </option>
                             {defaultAuthorsYearsGenres.years.map((year) => <option value={year}>{year}</option>)}
                         </Select>
                         <Select value={form.author}  onChange={(e) => onChange(e.target.value, 'author')}>
                             <option value="" hidden disabled className='' defaultChecked={true}>
                                 Author
                             </option>
                             {defaultAuthorsYearsGenres.authors.map((author) => <option value={author}>{author}</option>)}
                         </Select>
                     </form>
                    <div className='flex justify-between'>
                        <Input value={form.search} onChange={(e) => onChange(e.target.value, 'search')} placeholder='search here' width='90%'></Input><button className='bg-black font-bold text-white text-1xl px-4 py-2 rounded-xl '>Search</button>
                    </div>
           <Button onClick={() => setForm({  genres:'',
               year:'',
               author:'',
               search:'',})}>Clear</Button>

       </section>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>
           { books.map((book:any, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null}/>)}
           {books.length < 1 && filterBooksBoolean && <span className='font-bold text-[2rem] mx-auto mt-[1rem]'>Book not found</span>}
       </section>
   </main>


    </>)
}