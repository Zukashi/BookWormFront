import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {AuthorDocs} from "../../features/Author/authorSlice";
import {Link, useNavigate} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {BooksSearchBar} from "../Home/HintsSearchBar";
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";
import {Button, Progress, Spinner} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import dayjs from "dayjs";
import {OneReviewOrdinary} from "./OneReviewOrdinary";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
export interface Book {
  amountOfRates: number;
  ratingTypeAmount: number[];
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
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.user);

  const [book, setBook] = useState<Book|null>();
  const {bookId} = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [rating,setRating] = useState<number>(0);
  const [personalRating, setPersonalRating] = useState<number>(0)
  const [hover, setHover] = React.useState(0);
  const [showFullText , setShowFullText] = useState(false)
  const [hoverSpoiler, setHoverSpoiler] = useState<boolean>(false)
  const [review, setReview] = useState<any>();
  const axiosPrivate = useAxiosPrivate();
  const [reviews, setReviews] = useState<any[]>();
  const [originalReviews, setOriginalReviews] = useState<any[]>()
  const [filterStars, setFilterStars] = useState<boolean>(false);
  const [filterRate, setFilterRate] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean[]>([false,false,false,false,false])
  const refresh = async () => {
    try{
      const res = await axiosPrivate.get(`http://localhost:3001/book/${bookId}`);
      setBook(res.data);
      const res3 = await axiosPrivate.get(`http://localhost:3001/book/${res.data._id}`)

      setRating(res3.data.rating);
      const res5 = await axiosPrivate.get(`http://localhost:3001/book/${res.data._id}/reviews`);
      setReviews(res5.data);
      setOriginalReviews(res5.data)
      const res2 = await axiosPrivate(`http://localhost:3001/user/${user._id}/book/${res.data._id}`);

      setReview(res2.data)
      setPersonalRating(res2.data.rating)
    }catch (e) {
      console.log('catcherror')
    }
    setLoading(false)
  };
  const deleteReview = async () => {
    navigate(`${`/book/${book?._id}`}`)
    await axiosPrivate.delete(`http://localhost:3001/book/${book?._id}/user/${user._id}/review/${personalRating}`);
    setPersonalRating(0)
    refresh();
  }
  const changeFilter = async (rating:number) => {
    setFilterRate(rating);
    setFilterStars((prev) => !prev);
    setIsHighlighted((prev) => {
      const newArray = [false,false,false,false,false];
      prev[rating - 1] = !prev[rating-1]
      if(filterRate !== rating){
        newArray[rating- 1] = !newArray[rating - 1]
        return newArray
      }else{
        return prev
      }

    })
    if (rating !== filterRate){
      const filteredReviewsByRating = originalReviews?.filter((review) => {
        return review.rating === rating
      });
      setReviews(filteredReviewsByRating)
    } else if (filterRate === rating){
      setFilterRate(0)
      const res5 = await axiosPrivate.get(`http://localhost:3001/book/${book?._id}/reviews`);
      setReviews(res5.data)
    }
  }
  useEffect(() => {
      refresh()

  }, []);
  const handleClick = async (value:number) => {
    setPersonalRating(value)
    await axiosPrivate.post(`http://localhost:3001/book/${book?._id}/${value}`);
    const res = await axiosPrivate.post(`http://localhost:3001/user/${user._id}/book/${bookId}`,JSON.stringify({
        rating:value,
        description:'',
        status:'read',
        spoilers:false,
        comments:[]
      })
    );

    setBook(res.data)
    setRating(res.data.rating);
    refresh();
  };
  const stars = Array(5).fill(0);
  const handleMouseOver = (value:number) => {
    setHover(value)
  }
  const handleMouseLeave = (value:number) => {
    setHover(0)
  };

  while(loading || !book){
    return <>
      <div className='pt-20'></div>
      <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div>
    </>
  };
  const [dayNumber,monthName,year]= (dayjs(review?.date).format('DD/MMMM/YYYY')).split('/');
  const sumOfRatings =  book.ratingTypeAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
  );
  console.log(filterStars)
  return (<>
    <section className='w-screen bg-[#fbfcff]  mb-5 m-auto   '>
      <HomeNav/>
      <div className='pt-20'></div>
      <div className='w-[90%] rounded-md  bg-white shadow-2xl mx-auto pb-10  h-full'>
       <div className='flex justify-center pt-4'> <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></div>
        <div className='mt-4 pl-[1.7rem] text-[1.5rem] font-medium'><p>{book.title}</p></div>
        <div className='flex justify-start mt-4 pl-[1.7rem]'>
          {
            stars.map((_, index) => {
              return (
                  <i className={`fa-solid fa-star text-2xl cursor-pointer ${(rating) - 0.99 > index  && `text-[#faaf00]`} ` } key={index} ></i>

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
        <h1 className='ml-[1.7rem]  py-5 text-[1.4rem] font-bold '>Ratings & Reviews</h1>
        { !personalRating ?  <div className='flex items-center flex-col'>
          <img className='w-12' src={user.base64Avatar} alt=""/>
          <h2 className='text-2xl w-[70vw] flex justify-center mt-4 pb-3'>What do <p className='font-liberville px-1.5 pt-[2px]'>you</p> think?</h2>
          <div className='flex justify-start mt-2 mb-2 '>
            {
              stars.map((_, index) => {
                return (
                    <i className={`fa-solid fa-star text-3xl cursor-pointer ${0 > index + 1 && `text-[#faaf00]`} ` } key={index} onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave}  ></i>
                )
              })
            }
          </div>
          <h3 className='text-[1rem] font-medium mb-5'>Rate this book</h3>
          <Link to={`/review/new/${bookId}`}><button className='bg-[#4f4f4d] py-2 px-6 rounded-3xl'><p className='text-white font-medium text-xl'>Write a Review</p></button></Link>
        </div>:
            <div className='ml-[1.7rem] pb-5'>
          <h1 className='text-[1.1rem] font-[500] mb-3'>My Review</h1>
        <div className='w-full flex'>
          <img className='w-[1.9rem] pt-1.5' src={user.base64Avatar} alt=""/>
          <p className='ml-3 font-medium'>{user.username}</p>
        </div>
          <div className='flex items-end gap-[4rem]'>
          { <div className='flex justify-start mt-3 mb-1'>
            {
              stars.map((_, index) => {
                return (
                    <i className={`fa-solid fa-star text-md cursor-pointer ${(hover || personalRating)  > index  && `text-[#faaf00]`} ` } key={index}  ></i>

                )
              })
            }
          </div>}
          <p className='font-medium'>{monthName} {dayNumber}, {year}</p>
          </div>
             <div className={`    font-[450] ${showFullText ? 'overflow-auto max-h-screen': review?.description?.length > 160 ?  'max-h-[6rem] overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `} onMouseOver={() => setHoverSpoiler(true)} onMouseLeave={() => setHoverSpoiler(false)}> {(review?.description && review.spoilers )&& <p className={`  inline  mt-3 bg-[#687a86] ${!hoverSpoiler ? 'text-transparent': 'text-black bg-[#e7e9ee]'}`} >{review?.description}</p>}</div>
              {review?.description && !review.spoilers &&   <div className={` max-h-[6rem] overflow-hidden  font-[450] ${showFullText ? 'overflow-auto max-h-screen': review?.description.length > 160 ? 'overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}><p className='text-[1rem] font-[450] mt-3 ' >{review?.description}</p></div>}
              {review?.description?.length > 160 ? !showFullText ? <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(true)}>Show more <i
                  className="fa-solid fa-arrow-down" ></i></button> : <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(false)}>Show Less <i
                  className="fa-solid fa-arrow-up" ></i></button> : null }

            <div className='flex justify-between'>
              <button className='bg-white w-36 inline-block font-medium rounded-2xl border-2 px-3 py-1 border-[#808080] flex items-center gap-2 mt-4'><Link to={`/review/edit/${bookId}`} className='flex  gap-2'>
                <img src='https://cdn-icons-png.flaticon.com/512/2985/2985043.png' className='w-5 inline-block' alt="pen"/><p className='flex items-start '>Edit Review</p></Link></button>
              <button className='bg-white font-medium rounded-2xl mr-[1.7rem] p-[.5rem]   border-[#808080] flex items-center gap-2 mt-4' onClick={deleteReview}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>}
      <div className='ml-[1.7rem] mt-12'><h2 className='text-[1.22rem] font-bold'>Community Reviews</h2>
        <div className='flex justify-start mt-4 gap-3 items-center '>
          {
            stars.map((_, index) => {
              return (
                  <i className={`fa-solid fa-star text-2xl self-center  cursor-pointer ${(rating) - 0.99  > index && `text-[#faaf00]`} ` } key={index} ></i>

              )
            })
          }
          <p className='inline-block text-[1.7rem] font-medium ml-2 '>{book.rating.toFixed(2)} </p>
        </div>

        <div className='flex flex-col gap-5 mt-4'>

            {book.ratingTypeAmount.map((item,index) =>        <div className='flex gap-3 items-center' onClick={() => changeFilter(book?.ratingTypeAmount.length  - index)}>      <h3 className={`border-b-[0.19rem] border-b-black mb-0.5 ${isHighlighted[book?.ratingTypeAmount.length - 1 - index] && 'border-b-orange-400'} `}>{`${book?.ratingTypeAmount.length  - index}`} stars </h3>  <div className={`px-[0.6rem] py-[1rem] ${isHighlighted[book?.ratingTypeAmount.length - 1 - index] && 'bg-[#c1c1c1]'
            } rounded-2xl`}><Progress className='h-3 w-[37vw] rounded-xl' size='xl' value={sumOfRatings && ((book?.ratingTypeAmount[book?.ratingTypeAmount.length - 1 -  index] / sumOfRatings ) * 100)} /></div> <p className='w-20 flex '> {book.ratingTypeAmount[book?.ratingTypeAmount.length - 1 - index]} { sumOfRatings ? <p>({((book.ratingTypeAmount[book?.ratingTypeAmount.length -1 - index] / sumOfRatings ) * 100).toFixed(0)}%)</p>: <p className='inline-block'>(0%)</p>}</p>   </div> )}


        </div>
      </div>
        <div className='flex flex-col gap-6 mt-3'>
        {reviews?.map((review) => <OneReviewOrdinary key={review._id} review={review}/>)}
        </div>
      </div>
    </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author