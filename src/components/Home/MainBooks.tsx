import {Button, Spinner} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import {OneBook} from "./OneBook";
import {useNavigate} from "react-router-dom";

export const MainBooks = () => {
  const {user, token} = useSelector((rootState:any) => rootState.user)
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async() => {
      const res = await fetch(`http://localhost:3001/books`, {
        credentials:'include'
      })
      if(res.status === 401){
        console.log(333)
         const res2 = await fetch(`http://localhost:3001/auth/refreshToken`, {
           method:'POST',
           credentials:'include'
         })
        if(res2.status === 403){
          navigate('/')
        }
        else if(res2.status !== 403){
          window.location.reload();
        }
      }else{
        const data = await res.json();
        setBooks(data)
      }
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
      {books.map((book:any, i:number) => <OneBook key={i}  book={book} refresh={() =>  null} />)}
    </div>

    </main>
  </>)
}