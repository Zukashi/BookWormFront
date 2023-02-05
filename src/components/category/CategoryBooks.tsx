import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input, Select} from "@chakra-ui/react";

export const CategoryBooks = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [selectedValue, setSelectedValue] = useState('');
    const genres = ['Mystery', 'Fantasy', 'War'];
    const years = [2017, 2016, 2015];
    const authors = ['JK Rowling', 'Andrzej Sapkowski']
    return (<>
   <main>
       <div className='pt-20'></div>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12'>


                 <h1 className='font-bold text-[2rem] text-center'>Search by book name</h1>
                 <div className='flex flex-col w-full gap-4'>
                     <Select value={selectedValue} {...register('genres')}>
                         <option value="" hidden disabled className='' defaultChecked={true}>
                             Genres
                         </option>
                         {genres.map((genre) => <option value={genre}>{genre}</option>)}
                     </Select>
                     <Select value={selectedValue} {...register('year')}>
                         <option value="" hidden disabled className='' defaultChecked={true}>
                             Year
                         </option>
                         {years.map((year) => <option value={year}>{year}</option>)}
                     </Select>
                     <Select value={selectedValue} {...register('author')}>
                         <option value="" hidden disabled className='' defaultChecked={true}>
                             Author
                         </option>
                         {authors.map((author) => <option value={author}>{author}</option>)}
                     </Select>
                    <div className='flex gap-[10px]'>
                        <Input placeholder='search here' width='75%'></Input><button className='bg-black font-bold text-white text-1xl px-4 py-2 rounded-xl '>Search</button>
                    </div>
                 </div>

       </section>
   </main>


    </>)
}