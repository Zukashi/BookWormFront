import {Button} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {OneBook} from "./OneBook";

export const MainBooks = () => {
  const user = useSelector((rootState:any) => rootState.user)
  const [books, setBooks] = useState([])
  useEffect(() => {
    (async() => {
      const res = await fetch(`http://localhost:3001/books`)
      const data = await res.json();
      setBooks(data)
    })()
  },[])
  if(books === null) {
    return <h1>XD</h1>
  };
  console.log(books)
  return (<>
    <main className='w-[90vw]  m-auto pt-20' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div>
    <div className='flex-col gap-0 justify-between items-center'>
      {books.map((book:any, i:number) => <OneBook key={i}  book={book}/>)}
    </div>

    </main>
  </>)
}