import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {AuthorDocs} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {BooksSearchBar} from "../Home/HintsSearchBar";
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
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
  rating:number,
}

export const OneBook = () => {
  const params = useParams();
  const {user} = useSelector((state: RootState) => state.user);
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
    <section className='w-screen bg-[#fbfcff]  mb-5 m-auto   '>
      <HomeNav/>
      <div className='pt-20'></div>
      <div className='w-[90%] rounded-md  bg-white shadow-2xl mx-auto  h-full'>
       <div className='flex justify-center pt-4'> <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></div>
        <div className='mt-4 pl-[1.7rem] text-[1.5rem] font-medium'><p>{book.title}</p></div>
        <div className='flex justify-start mt-4 pl-[1.7rem]'>
          {
            stars.map((_, index) => {
              return (
                  <i className={`fa-solid fa-star text-2xl cursor-pointer ${(hover || rating) > index + 1 && `text-[#faaf00]`} ` } key={index} ></i>

              )
            })
          }
          <p className='inline-block text-[1.4rem] font-medium ml-2'>{book.rating.toFixed(2)}</p>
        </div>
        <div className='ml-[1.7rem] pb-4 mx-auto w-[90%] mt-4 font-mono font-[400] tracking-tighter text-[16px] leading-[25px] mr-[1.7rem]'>
          {!book.description ? <p>This edition doesn't have a description yet.</p>:
          <p className='break'>{book.description}</p>}
        </div>
        <div className='ml-[1.7rem] w-full h-[1px] w-[90%] mx-auto bg-[#edbdf0]'></div>
        <div className='ml-[1.7rem] mt-[1.5rem] pb-5'><p className='text-xl'>Author: <p className='inline-block font-bold'>{book.author}</p></p></div>
        <div className='ml-[1.7rem] w-full h-[1px] w-[90%] mx-auto bg-[#edbdf0]'></div>
        <h1 className='ml-[1.7rem]  py-5 text-[1.2rem] font-bold w-90vw'>Ratings & Reviews</h1>
        <div className='flex items-center flex-col'>
          <img className='w-12' src={user.base64Avatar} alt=""/>
          <h2 className='text-2xl w-[70vw] flex justify-center mt-4 pb-3'>What do <p className='  font-liberville px-1.5 pt-[2px]'>you</p> think?</h2>
          <h3 className='text-[1rem] font-medium'>Rate this book</h3>
          <button className='bg-[#4f4f4d] py-2 px-6 rounded-3xl'><p className='text-white font-medium text-xl'>Write a Review</p></button>
        </div>
      </div>

    </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author