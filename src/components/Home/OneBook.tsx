import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Spinner} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Book} from "../Book/AdminBookList";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import axios from "axios";
import {StatusCurrent} from "../Repeatable/StatusCurrent";
import {setBook} from "../../features/Books/bookSlice";
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
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();
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
  console.log(modal);
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

  console.log(book.rating)

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
    <div className='flex relative mx-auto gap-5 w-full'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
    <Link to={`/book/${book._id}`} className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black invisible lg:visible' h='31px' w='83px'>View Book</Button><div className='h-[250px] flex items-center'><img ref={refImg} src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40 rounded-md" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/></div>

    </Link>

  </div>

    <div className='inline-block mt-14 flex flex-col gap-4'><p className='text-[15px] font-bold w-36 leading-5
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


      <StatusCurrent refresh={refreshOneBook} book={book} onDelete={deleteReview}/>
    </div>



  </div>


    </>)
}