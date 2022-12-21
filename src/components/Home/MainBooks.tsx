import {Button, Spinner} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import {OneBook} from "./OneBook";
import {HomeAdminNav} from "./AdminHome/HomeAdminNav";
import {HomeNav} from "./HomeNav";

export const MainBooks = () => {
  const user = useSelector((rootState:any) => rootState.user)
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const changeLoading = () => {
    setLoading(prev => !prev)
    return null
  }
  useEffect(() => {
    (async() => {
      const res = await fetch(`http://localhost:3001/books`)
      const data = await res.json();
      setBooks(data)
    })()
    const timer = setTimeout(() => {
      setLoading(false)
    }, 200)
    return () => clearInterval(timer)
  },[])
  while (loading){
    return <>  {user.isAdmin ?  <HomeAdminNav/> : <HomeNav/>}
      <div className='pt-20'></div>
      <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
  }
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