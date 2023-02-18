import {Button, Spinner} from "@chakra-ui/react";
import React from "react";
import { OneBookHome} from "./OneBook";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {SpinnerComponent} from "../../SpinnerComponent";
export const MainBooks = () => {
  const {data:books, isLoading,  isError} = useQuery({
    queryKey:['books'],
    keepPreviousData:true,
    queryFn:async () => {
      const res = await axiosPrivate.get(`http://localhost:3001/books`);
      return res.data
    }
  })
  const axiosPrivate = useAxiosPrivate();
  if(isLoading) return <SpinnerComponent/>
  return (<>
    <main className='w-[90vw]  m-auto pt-20' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div>
    <div className='flex-col gap-0 justify-between items-center'>
      {books.map((book:any, i:number) => <OneBookHome key={i}  book={book} refresh={() =>  null} />)}
    </div>

    </main>
  </>)
}