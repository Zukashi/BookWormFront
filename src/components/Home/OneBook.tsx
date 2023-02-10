import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Book} from "../Book/AdminBookList";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import axios from "axios";
interface Props {
  book: Book,
  refresh: () => void,
}
export const OneBookHome = ({book,refresh}:Props) => {
  const refImg = useRef<HTMLImageElement>(null);
  const [favorite ,setFavorite] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate()
  const [loading, setLoading] = useState<boolean>(true)
  const {user} = useSelector((state: RootState) => state.user);
  const [rating,setRating] = useState<number>(0);
  const [hover, setHover] = React.useState(0);
  const stars = Array(5).fill(0);
  const [bookStatus, setBookStatus] = React.useState<string>('')
  const handleMouseOver = (value:number) => {
    setHover(value)
  }
  const handleMouseLeave = (value:number) => {
    setHover(0)
  }
  const mouseEntered = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    } else{
      refImg.current.classList.add('opacity-50')
    }
  };
  useEffect(() => {
    ( async () => {
      const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/favorites`);
      const resStatusOfBook = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/${book._id}/status`);
      console.log(resStatusOfBook)
      if(resStatusOfBook.data === 'not found shelf'){
              setBookStatus("")
      }else{
        setBookStatus(prev => resStatusOfBook.data.typeOfShelf)
      }
      const res2 = await axiosPrivate.get(`http://localhost:3001/book/${book._id}`);
      console.log(res2.data)
      setRating(res2.data.rating - 1)
      // const res3 = await fetch(`http://localhost:3001/books`, {
      //   credentials:'include'
      // });
      // const data3 = await res3.json();
      res.data.forEach((favorite:any) => {
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

          await axiosPrivate.put(`http://localhost:3001/user/${user._id}/favorite`, JSON.stringify(book))
          refresh();
        })();

      }else{
        setFavorite(false);
        (async() => {
          await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book._id}/favorite`)
          refresh();
        })();

      }

  };
  const updateStatusOfBook = async () => {
    await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/${book._id}/read`)
    setBookStatus('Read')
  }
  const colors  = {
    orange: '#faaf00',
    grey:'#a9a9a9'
  }
  console.log(book.rating)

  const mouseLeft = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    }
    refImg.current.classList.remove('opacity-50')
  }
  console.log(bookStatus)
  while (loading){
    return <>
      <div className='pt-20'></div>
      <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
  }
  return (<>
    <div className='flex relative mx-auto gap-5 w-full'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
    <Link to={`/book/${book._id}`} className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black invisible lg:visible' h='31px' w='83px'>View Book</Button><div className='h-[250px] flex items-center'><img ref={refImg} src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40 rounded-md" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/></div>

    </Link>

  </div>

    <div className='inline-block mt-14 flex flex-col gap-4'><p className='text-[15px] font-bold w-40 leading-5
    '>{book.title}</p>
      <p className='text-[16px]'>{book.author} </p>

      <div className=' h-7  right-[2.5rem] bottom-[2rem] w-full'>
        {
          stars.map((_, index) => {
            return (
                <i className={`fa-solid fa-star text-xl cursor-pointer ${(hover || book.rating)- 1 + 0.01 > index  && `text-[#faaf00]`} ` } key={index}></i>

            )
          })

        }
        <p className='inline-block text-[1.2rem] font-medium'>{book.rating.toFixed(2)}</p>

      </div>

      {!favorite ?  <i onClick={changeFavorite} className="fa-regular fa-heart fa-xl text-red-500 cursor-pointer   w-2"></i>:
         <i onClick={changeFavorite} className="fa-solid fa-heart fa-xl text-red-500  cursor-pointer w-2"></i>}
      <div className='bg-[#409d69] flex rounded-xl text-[#ffffff]'><button className='px-2 cursor-pointer py-2 border-r-[1px] border-r-amber-800' onClick={() => updateStatusOfBook}>{!bookStatus && 'Want To Read'}</button><button className='w-11 flex justify-center items-center '><img className='w-6 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/5833/5833290.png" alt='icon of books'/></button></div>
    </div>



  </div>
    <div className='fixed -bottom-2 left-0 w-screen bg-white rounded-lg pb-10'>
      <div className='w-[85%] mx-auto'>
        <div className='flex  gap-16 pt-6 pb-8 justify-between'><h3 className='font-medium text-lg'>Choose a shelf for this book</h3><span>X</span></div>
        <div className='flex flex-col gap-3'>
          <div className='border-2 border-[#271c148f] rounded-3xl px-2 py-1.5'><button className='w-full'><span className='font-medium'>Want to read</span></button></div>
          <div className='border-2 border-[#271c148f] rounded-3xl px-2 py-1.5'><button className='w-full'><span className='font-medium'>Currently reading</span></button></div>
          <div className='border-2 border-[#271c148f] rounded-3xl px-2 py-1.5'><button className='w-full'><span className='font-medium'>Read</span></button></div>
        </div>
      </div>
    </div>
    </>)
}