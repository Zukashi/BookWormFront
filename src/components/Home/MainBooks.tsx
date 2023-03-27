import {Button, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import { OneBookHome} from "./OneBook";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {SpinnerComponent} from "../SpinnerComponent";
import { BookEntity } from "types";
import {Link} from "react-router-dom";
export const MainBooks = () => {
  const [loading ,setLoading] = useState(true)
  const {data:books, isLoading,  isError} = useQuery({
    queryKey:['books'],
    keepPreviousData:true,
    queryFn:async () => {
      const res = await axiosPrivate.get(`http://localhost:3001/books`);

      return res.data
    }
  })
  useEffect(() => {
      const timeout  = setTimeout(()=> {
          setLoading(false);

      }, 300);
        return () => clearInterval(timeout)
  }, [])
  const axiosPrivate = useAxiosPrivate();
  if(isLoading) return <SpinnerComponent/>
  return (<>
    <main className='w-[97.5vw]  m-auto pt-20' >
    <div className='w-full border-black border-b-2 pb-1.5 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <button className='px-4 py-1 text-bold text-2xl rounded-xl bg-teal-700 active:bg-teal-900 hover:bg-teal-800  text-white' ><Link to={'/category'}>View More</Link></button>
      </div>
    </div>


      <div className={`${(books.length < 3) ? `flex flex-wrap gap-6  md:px-4 justify-center  max-w-[${347 * books.length}px]   rounded-lg  bg-white    mx-auto` :'flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto'}`}>
        {books?.slice(0,12).map((book:BookEntity, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
      </div>



    </main>
  </>)
}