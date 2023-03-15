import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link, Route} from "react-router-dom";
import {Button, Spinner} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {StatusCurrent} from "../Repeatable/StatusCurrent";
import {setBook} from "../../features/Books/bookSlice";
import {SpinnerComponent} from "../../SpinnerComponent";
import {AddToPersonalList} from "./AddToPersonalList";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
interface Props {
  book: BookEntity,
  refresh: () => void,
}
export const OneBookHome = ({book,refresh}:Props) => {
  const refImg = useRef<HTMLImageElement>(null);
  const [favorite ,setFavorite] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate()

  const {user} = useSelector((state: RootState) => state.user);
  const [rating,setRating] = useState<number>(0);
  const stars = Array(5).fill(0);
  const dispatch = useDispatch();


  const refreshOneBook = () => {
    ( async () => {
      const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/favorites`);
      const res2 = await axiosPrivate.get(`http://localhost:3001/book/${book._id}`);
      dispatch(setBook(res2.data))
      setRating(res2.data.rating - 1)
      res.data.forEach((favorite:any) => {
        if (favorite.isbn?.includes(book.isbn)){
          setFavorite(true)
        }
      });
    })();
  }
  const deleteReview = async () => {

      await axiosPrivate.delete(`http://localhost:3001/book/${book?._id}/user/${user._id}/review/${rating}`);
      await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book?._id}/status`);

  }
  useEffect(() => {
    refreshOneBook()
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


  const mouseLeft = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    }
    refImg.current.classList.remove('opacity-50')
  }
  if(!book){
    return <h1>123</h1>
  }
  return (<>
    <div className='flex relative  gap-[1rem]   sm:h-[100%] mt-5    justify-center mb-4   sm:gap-[.5rem] items-start'> <div className='   inline-block  '>
    <Link to={`/book/${book._id}`} className='relative   '><div className='flex items-center bg-black rounded-xl'><img ref={refImg} aria-label={`click this image to redirect to book ${book.title}` }  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="cursor-pointer  inline-block  cursor-default w-[35vw] max-w-[165px] min-h-[190px] rounded-xl  sm:w-[120px] sm:min-h-[180px] sm:h-[100%] md:h-64  md:w-[170px] xl:h-72 xl:min-w-[185px] hover:bg-black hover:opacity-50"   alt=""/></div>

    </Link>

  </div>

    <div className='inline-block  flex flex-col gap-1.5  w-[153px]  '><p className='w-full text-[15px] md:h-14 font-bold w-36 leading-5  sm:text-[14px] md:text-[20px] sm:h-[40px] sm:flex sm:items-start
    '>{book.title}</p>
      <p className='text-[16px] sm:text-[13px] w-full '>{book.author} </p>

      <div className=' h-8    w-full flex  justify-center   '>
        {
          stars.map((_, index) => {
            return (
                <i className={`fa-solid fa-star  text-xl sm:text-[16px]   ${(book.rating)- 1 + 0.01 > index  && `text-[#faaf00]`} mb-2 sm:mb-0` } key={index}></i>

            )
          })

        }
        <div className='flex w-full justify-between items-start  ml-1 h-full'>
          <p className='inline-block text-[1.2rem] font-medium sm:text-[1.2rem]  sm:font-[750]'>{book?.rating?.toFixed(2)}</p>
        </div>


      </div>
      <span className='flex  gap-6 '>
        {!favorite ?  <i onClick={changeFavorite} className="flex items-center fa-regular fa-heart fa-xl text-red-500 cursor-pointer   w-2 mb-3 mt-3"></i>:
            <i onClick={changeFavorite} className="fa-solid fa-heart fa-xl text-red-500  cursor-pointer w-2 mb-3 mt-3"></i>}

        <AddToPersonalList book={book}/>
     </span>



      <StatusCurrent refresh={refreshOneBook} book={book} onDelete={deleteReview}/>
    </div>



  </div>


    </>)
}