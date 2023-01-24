import {Button, Spinner} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { OneBookHome} from "./OneBook";
import {useNavigate} from "react-router-dom";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
export const MainBooks = () => {
  const {user, token} = useSelector((rootState:any) => rootState.user)
  const [books, setBooks] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    (async() => {
      const res = await axiosPrivate.get(`http://localhost:3001/books`);
      setBooks(res.data)

    // @TODO do that for each fetch but first make function that takes query and returns response from server
    })()
  },[]);

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