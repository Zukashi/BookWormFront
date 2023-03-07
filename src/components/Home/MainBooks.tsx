import {Button, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import { OneBookHome} from "./OneBook";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {SpinnerComponent} from "../../SpinnerComponent";
import { BookEntity } from "types";
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

      }, 200);
        return () => clearInterval(timeout)
  }, [])
  const axiosPrivate = useAxiosPrivate();
  if(loading) return <SpinnerComponent/>
  return (<>
    <main className='w-[97.5vw]  m-auto pt-20' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div>

    <div className='flex flex-wrap justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 '>
      {books.map((book:BookEntity, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
    </div>


    </main>
  </>)
}