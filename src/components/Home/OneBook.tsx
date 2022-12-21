import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {DrawerComponent} from "./DrawerMobile";
import {Book} from "../Book/AdminBookList";
import {HomeAdminNav} from "./AdminHome/HomeAdminNav";
import {HomeNav} from "./HomeNav";
interface Props {
  book: Book,
  refresh: () => void,
}
export const OneBook = ({book,refresh}:Props) => {
  const refImg = useRef<HTMLImageElement>(null);
  const [favorite ,setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)
  const user = useSelector((state: RootState) => state.user);
  const mouseEntered = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    } else{
      refImg.current.classList.add('opacity-50')
    }
  };
  useEffect(() => {
    ( async () => {
      const res = await fetch(`http://localhost:3001/user/${user._id}/favorites`);
      const data = await res.json();
      const res3 = await fetch(`http://localhost:3001/books`);
      const data3= await res3.json();
      data.forEach((favorite:any) => {
        if (favorite.isbn?.includes(book.isbn)){
          setFavorite(true)
        }
      });
    })();
    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)
    return () => clearInterval(timer)
  },[]);

  const changeFavorite = () => {
      if(favorite === false){
        setFavorite(true);
        (async() => {

          await fetch(`http://localhost:3001/user/${user._id}/favorite`,{
            method:"PUT",
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(book)
          })
          refresh();
        })();

      }else{
        setFavorite(false);
        (async() => {
          await fetch(`http://localhost:3001/user/${user._id}/favorite`,{
            method:"DELETE",
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(book)
          })
          refresh();
        })();

      }

  }
  const mouseLeft = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    }
    refImg.current.classList.remove('opacity-50')
  }
  while (loading){
    return <>
      <div className='pt-20'></div>
      <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
  }
  return (<>
    <div className='flex'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
    <Link to='/works/OL27213498M' className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><img ref={refImg} src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/>

    </Link>

  </div>
    <div className='inline-block -ml-10 mt-20'><p className='text-[15px] font-bold w-40 leading-5
    ml-16'>{book.title}</p>
      <p className='text-[16px] mt-2 ml-16'>{book.author} </p>
      <i className="fa-solid fa-cart-shopping fa-xl cursor-pointer ml-16 "></i>


     {!favorite ?  <button onClick={changeFavorite} className='mt-6'><i className="fa-regular fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button> :
         <button onClick={changeFavorite} className='mt-6'> <i className="fa-solid fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button>} </div>
  </div>
    </>)
}