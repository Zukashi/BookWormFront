import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {AuthorDocs} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {BooksSearchBar} from "../Home/HintsSearchBar";
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {Spinner} from "@chakra-ui/react";
export interface Book {
  _id:string,
  type: {
    key:string,
  },
  title:string,
  covers:number[],
  key:string,
  created:{
    type:string,
    value:string,
  },
  last_modified:{
    type:string,
    value:string,
  },
  author:string,
  isbn:string,
  description:string,
}

export const OneBook = () => {
  const params = useParams();
  const [book, setBook] = useState<Book|null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [rating,setRating] = useState<number>(0);
  const [hover, setHover] = React.useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/book/${params.bookId}`, {
        credentials:'include'
      });
      const data = await res.json();
      setBook(data);
      const res2 = await fetch(`http://localhost:3001/book/${data._id}`,{
        credentials:'include'
      });
      const data2 = await res2.json();
      setRating(data2.rating)
      setLoading(false)
    })();

  }, [])
  const stars = Array(5).fill(0);
  const handleMouseOver = (value:number) => {
    setHover(value)
  }
  const handleMouseLeave = (value:number) => {
    setHover(0)
  };
  const handleClick = async (value:number) => {
    setRating(value)
    await fetch(`http://localhost:3001/book/${book?._id}/${value}`,{
      method:'PUT',
      credentials:'include'
    })
  }
  while(loading || !book){
    return <>
      <div className='pt-20'></div>
      <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div>
    </>
  }

  return (<>
    <section className='w-screen bg-[#fbfcff]  h-[100vh] m-auto '>
      <HomeNav/>
      <div className='pt-20'></div>
      <div className='w-[90%]  bg-white shadow-2xl mx-auto  h-full'>
       <div className='flex justify-center pt-4'> <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></div>
        <div className='mt-4 pl-[1.7rem] text-[1.5rem] font-medium'><p>{book.title}</p></div>
        <div className='flex justify-start mt-4 pl-[1.7rem]'>
          {
            stars.map((_, index) => {
              return (
                  <i className={`fa-solid fa-star text-2xl cursor-pointer ${(hover || rating) > index + 1 && `text-[#faaf00]`} ` } key={index}  onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave}></i>

              )
            })
          }
        </div>
        <div className='pl-[1.7rem] mt-4 font-mono font-[400] tracking-tighter text-[16px] leading-[25px]'>
          {!book.description ? <p>This edition doesn't have a description yet.</p>:
          <p>{book.description}</p>}
        </div>
      </div>
    </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author