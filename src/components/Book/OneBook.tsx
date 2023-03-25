import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import { useSelector} from "react-redux";
import {RootState} from "../../app/store";
import dayjs from "dayjs";
import {OneReviewOrdinary} from "./OneReviewOrdinary";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {StatusCurrent} from "../Repeatable/StatusCurrent";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {ProgressBarSection} from "./ProgressBarSection";
import {SpinnerComponent} from "../../SpinnerComponent";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

export const OneBook = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.user);
  const {drawer} = useSelector((state: RootState) => state.drawer);
  const [book, setBook] = useState<BookEntity|null>(null);
  const {bookId} = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const [rating,setRating] = useState<number>(0);
  const [personalRating, setPersonalRating] = useState<number>(0);
  const [hoverUpperRating, setHoverUpperRating] = useState<number>(0)
  const [hover, setHover] = React.useState(0);
  const [showFullText , setShowFullText] = useState(false)
  const [showFullTextDesc , setShowFullTextDesc] = useState(false);
  const [showFullTextDescMd , setShowFullTextDescMd] = useState(false);
  const buttonToResetScroll = useRef<any>();

  const [hoverSpoiler, setHoverSpoiler] = useState<boolean>(false)
  const [review, setReview] = useState<any>();
  const axiosPrivate = useAxiosPrivate();
  const [reviews, setReviews] = useState<any[]>();
  const [originalReviews, setOriginalReviews] = useState<any[]>();
  const refButtonText = useRef<any>()
  const [filterStars, setFilterStars] = useState<boolean>(false);
  const [filterRate, setFilterRate] = useState<number>(0);
  const [status , setStatus] = useState<string>('');
  const [originalStatus, setOriginalStatus] = useState<string>('not found')
  const [isHighlighted, setIsHighlighted] = useState<boolean[]>([false,false,false,false,false]);
  const refresh = async () => {
    try{
      const res = await axiosPrivate.get(`http://localhost:3001/book/${bookId}`);
      setBook(res.data);
      const res3 = await axiosPrivate.get(`http://localhost:3001/book/${res.data._id}`)
      const res4 = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/${bookId}/status`);
      if(res4.data !== '' && res4.data !== 'not found shelf'){
        setStatus(res4.data)
        setOriginalStatus(res4.data)
      }

      setRating(res3.data.rating);
      const res5 = await axiosPrivate.get(`http://localhost:3001/book/${res.data._id}/reviews`);
      setReviews(res5.data);
      setOriginalReviews(res5.data)
      const res2 = await axiosPrivate(`http://localhost:3001/user/${user._id}/book/${res.data._id}`);

      setReview(res2.data)
      setPersonalRating(res2.data.rating)
    }catch (e) {
    }
    setLoading(false)
  };
  if(location.state === 'delete') {
    location.state = ''
    void refresh();
  }
  const deleteReview = async () => {

    await axiosPrivate.delete(`http://localhost:3001/book/${book?._id}/user/${user._id}/review/${personalRating}`);
    await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book?._id}/status`);
    console.log(333)
    toast.success(`Review deleted successfully`, {
      position: toast.POSITION.BOTTOM_CENTER,
      theme:'dark',
      autoClose:3000
    });
    navigate(`${`/book/${book?._id}`}`)
    setPersonalRating(0);
    setHover(0)
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
  };
  const handleClick = async (value:number) => {

    setPersonalRating(value);
    setStatus(status  === '' ? 'read' : status)
    try{
      await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/${bookId}/${status  === '' ? 'read' : status }/${originalStatus}`)
      await axiosPrivate.post(`http://localhost:3001/book/${bookId}/${value}`);
    }catch(e){
      console.log(e)
    }
    if(personalRating === 0){
      try{
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${bookId}/status`)
        await axiosPrivate.post(`http://localhost:3001/user/${user._id}/book/${bookId}`,JSON.stringify({
              rating:value,
              description:'',
              status:status  === '' ? 'read' : status,
              spoilers:false,
              comments:[]
            })
        );
        toast.success(`${value} star rating saved`, {
          position: toast.POSITION.BOTTOM_CENTER,
          theme:'dark',
          autoClose:3000
        });
      }catch(e){
        toast.error(`Something went wrong try again`,{
          position: toast.POSITION.BOTTOM_CENTER,
          theme:'dark'
        })
      }

    }else if(personalRating <= 5 && personalRating >= 1){
     try{
       await axiosPrivate.delete(`http://localhost:3001/book/${bookId}/${personalRating}`)
       await axiosPrivate.put(`http://localhost:3001/user/${user._id}/book/${bookId}`,JSON.stringify({
             rating:value,
             description:review.description,
             status:status,
             spoilers:review.spoilers,
             comments:review.comments,
           })
       );
       toast.success(`Rating updated to ${value.toFixed()} stars`, {
         position: toast.POSITION.BOTTOM_CENTER,
         theme:'dark',
         autoClose:3000
       });
     }catch(e){
       toast.error('Something went wrong try again ', {
         position:toast.POSITION.BOTTOM_CENTER,
         theme:'dark'
       })
     }
    }

    refresh();
  };

  useEffect(() => {
    void refresh()
    if(location.state === 'delete') void refresh()
  }, []);
  const stars = Array(5).fill(0);
  const handleMouseOver = (value:number) => {
    setHover(value)
  }
  const handleMouseLeave = () => {
    setHover(0)
  };

  while(loading || !book){
    return <SpinnerComponent/>
  };
  const [dayNumber,monthName,year]= (dayjs(review?.date).format('DD/MMMM/YYYY')).split('/');
  return (<>
    <main className='   mb-5 m-auto   '>
      <ToastContainer/>
      <HomeNav/>
      <div className='pt-20'></div>
      <div className='w-full bg-white'>
      <div className='w-[90%] rounded-md md:w-[95%]   mx-auto pb-10  h-full md:w-[95%] '>
          <section className='md:hidden '>
            <div className='flex justify-center pt-7 sm:hidden '> <img className='rounded-r-3xl w-[40%]' src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`} onError={(e) => {
              e.currentTarget.src = "data:image/png;base64,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"
            }} alt="book image"/></div>
            <div className='flex justify-center pt-7 hidden sm:flex '> <img className='rounded-r-3xl w-[40%]' src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`} onError={(e) => {
              e.currentTarget.src = "data:image/png;base64,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"
            }} alt="book image"/></div>
            <div className='mt-4   font-medium flex justify-center text-[1.5rem]'><p className='w-[85%] text-center tracking-normal leading-8'>{book.title}</p></div>
            <div className='mt-4   font-extralight text-center text-xl'><p>{book.author}</p></div>
            <div className='flex justify-center mt-4 '>
              {
                stars.map((_, index) => {
                  return (
                      <i className={`fa-solid fa-star text-3xl  ${(rating) - 0.99 > index  && `text-[#faaf00]`} ` } key={index} ></i>

                  )
                })
              }
              <p className='inline-block text-3xl font-medium ml-2'>{book.rating.toFixed(2)}</p>
            </div>
            <div className='flex justify-center gap-4 font-medium text-sm text-[#707070] mt-3'>
              <p>{book.amountOfRates} ratings</p> <p>{reviews?.length} reviews</p>
            </div>
            <div className='w-60 mx-auto my-4'>
              <StatusCurrent book={book} refresh={refresh} onDelete={deleteReview}/>
            </div>


            <div className='flex flex-col items-center'>
              <div className='flex justify-center mt-2 mb-2 '>
                {
                  stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-3xl cursor-pointer ${(hoverUpperRating || personalRating) > index  && `text-[#faaf00]`} ` } key={index} onClick={() => handleClick(index+1)} onMouseOver={() => setHoverUpperRating(index+ 1)} onMouseLeave={() => setHoverUpperRating(0)}  ></i>
                    )
                  })
                }
              </div>
              {personalRating === 0 ? <h3 className='text-[1rem] font-medium mb-2'>Rate this book</h3>:<h3  className='font-medium'>Rated.<Link className='border-b-2 border-transparent ml-1 hover:border-black' to={`/review/edit/${bookId}`}>{review?.description?.length > 0 ? 'Edit review' : 'Write a review'}</Link></h3>}
            </div>
          </section>

        <div className='block md:grid md:grid-cols-OneBookMd mx-auto ' >
         <div className='h-full max-w-[450px] '>
           <section className={`hidden top-16 md:sticky md:flex md:flex-col ${drawer ? 'md:z-10': 'md:z-20'}  `}>
             <div className='flex pb-3 pt-4 justify-center hidden sm:flex '> <img className='rounded-r-3xl w-[70%] h-[35%] lg:w-[65%] lg:rounded-r-xl ' src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`} onError={(e) => {
               e.currentTarget.src = "data:image/png;base64,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"
             }} alt="book image"/></div>



             <div className='w-5/6 max-w-[270px] mx-auto  my-4'>
               <StatusCurrent book={book} refresh={refresh} onDelete={deleteReview}/>
             </div>


             <div className='flex flex-col items-center'>
               <div className='flex justify-center mt-2 mb-2 '>
                 {
                   stars.map((_, index) => {
                     return (
                         <i className={`fa-solid fa-star text-3xl cursor-pointer ${(hoverUpperRating || personalRating) > index  && `text-[#faaf00]`} ` } key={index} onClick={() => handleClick(index+1)} onMouseOver={() => setHoverUpperRating(index+ 1)} onMouseLeave={() => setHoverUpperRating(0)}  ></i>
                     )
                   })
                 }
               </div>
               {personalRating === 0 ? <h3 className='text-[1rem] font-medium mb-2'>Rate this book</h3>:<h3  className='font-medium'>Rated.<Link className='border-b-2 border-transparent ml-1 border-b-black' to={`/review/edit/${bookId}`}>{review?.description?.length > 0 ? 'Edit review' : 'Write a review'}</Link></h3>}
             </div>
           </section>
         </div>
          <div className='block md:w-11/12 xl:w-5/6 mt-1'>


           <div className='flex flex-col items-start hidden md:flex  '>
             <div className='mt-4   font-medium  text-[2.5rem] font-liberville  '><p className='leading-10  tracking-normal leading-8'>{book.title}</p></div>
             <div className='mt-4   font-extralight text-2xl font-mono'><Link to={`/author/${book.authors}`} className='cursor-pointer border-b-2 border-b-transparent hover:border-b-black'>{book.author}</Link></div>
            <Link className='lg:flex lg:items-end  lg:gap-5 rounded-lg ' to={'#Community_reviews'}>
              <div className='flex  mt-4 '>
                {
                  stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-3xl  ${(rating) - 0.99 > index  && `text-[#faaf00]`} ` } key={index} ></i>

                    )
                  })
                }
                <p className='inline-block text-3xl font-medium ml-2'>{book.rating.toFixed(2)}</p>
              </div>
              <div className='flex  gap-4 font-medium text-sm text-[#707070] mt-4 mb-2'>
                <p>{book.amountOfRates} ratings</p> <p>{reviews?.length} reviews</p>
              </div>
            </Link>
           </div>





            <div className={` pb-4 mx-auto w-full mt-4 font-[400] tracking-tighter text-[1.6rem/1.4] lg:w-4/5 lg:mx-0  leading-7 ${showFullTextDesc ? 'overflow-auto ': book?.description?.length && book.description.length > 200 ?  'max-h-[9rem] overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}>
              {!book.description ? <p>This edition doesn't have a description yet.</p>:
                  <p className='text-[18px]'>{typeof book.description  !== 'object' ? book.description : (book as any).description.value  }</p>}

            </div>
            {typeof book.description?.length ==='number' && book.description.length > 160 ? !showFullTextDesc ? <button  className='flex items-center rounded-xl group  py-2 text-black font-medium mt-2 '  type='submit' onClick={() => setShowFullTextDesc(true)}><p className='group-hover:border-b-2 group-hover:border-b-black border-b-2 border-b-transparent'>Show more</p> <i
                className="fa-solid fa-angle-down ml-2 mt-1" ></i></button> : <button ref={buttonToResetScroll}  className='flex group items-center rounded-xl  py-2 text-black font-medium mt-2 '  type='submit' onClick={(e) => {
              console.log(buttonToResetScroll)
                  buttonToResetScroll.current.scrollTop = 0
              setShowFullTextDesc(false);
            } }><p className='group-hover:border-b-2 group-hover:border-b-black border-b-2 border-b-transparent'>Show less</p> <i
                className="fa-solid fa-angle-up ml-2 mt-1" ></i></button> : null }
            <div className='text-[#444] font-normal '>
              <div>
                <p> {book.number_of_pages} pages</p>
              </div>
              <div>
                <p>First published in {book.publish_date}</p>
              </div>
            </div>

            <div className=' mt-[1.5rem] pb-5'>
              <div className=' w-full h-[1px]  mx-auto bg-[#edbdf0] mb-5'></div>
              <p className='text-xl'>Author: <p className='inline-block font-bold'>{book.author}</p></p>
              <div className=' w-full h-[1px]  mx-auto bg-[#edbdf0] mt-5'></div>
            </div>

            <h1 className='  pb-5  text-[1.4rem] font-bold '>Ratings & Reviews</h1>
            { !personalRating ?  <div className='flex items-center flex-col'>
                  <img className='w-12' src={user.base64Avatar} alt=""/>
                  <h2 className='text-2xl w-[70vw] flex justify-center mt-4 pb-3'>What do <p className='font-liberville px-1.5 pt-[2px]'>you</p> think?</h2>
                  <div className='flex justify-start mt-2 mb-2 '>
                    {
                      stars.map((_, index) => {
                        return (
                            <i className={`fa-solid fa-star text-3xl cursor-pointer ${hover > index  && `text-[#faaf00]`} ` } key={index} onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave()}  ></i>
                        )
                      })
                    }
                  </div>
                  <h3 className='text-[1rem] font-medium mb-5'>Rate this book</h3>
                  <Link to={`/review/new/${bookId}`}><button className='bg-[#4f4f4d] py-2 px-6 rounded-3xl'><p className='text-white font-medium text-xl'>Write a Review</p></button></Link>
                </div>:
                <div className=' pb-5'>
                  <h1 className='text-[1.1rem] font-[500] mb-3'>My Review</h1>
                  <div className='w-full flex'>
                    <img className='w-[1.9rem] pt-1.5' src={user.base64Avatar} alt=""/>
                    <p className='ml-3 font-medium'>{user.username}</p>
                  </div>
                  <div className='flex items-end justify-between gap-[4rem]' >
                    { <div className='flex justify-start mt-3 mb-1'>
                      {
                        stars.map((_, index) => {
                          return (
                              <i className={`fa-solid fa-star text-md  ${(personalRating)  > index   && `text-[#faaf00]`} ` } key={index}  ></i>

                          )
                        })
                      }
                    </div>}
                    <p className='font-medium text-[#707070]'>{monthName} {dayNumber}, {year}</p>
                  </div>
                  <div className={`    font-[450] ${showFullText ? 'overflow-auto max-h-screen': review?.description?.length > 160 ?  'max-h-[6rem] overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `} > {(review?.description && review.spoilers )&& <p className={`  inline  mt-3 bg-[#687a86] ${!hoverSpoiler ? 'text-transparent': 'text-black bg-[#e7e9ee]'}`} onMouseOver={() => setHoverSpoiler(true)} onMouseLeave={() => setHoverSpoiler(false)} >{review?.description}</p>}</div>
                  {review?.description && !review.spoilers &&   <div className={` max-h-[6rem] overflow-hidden  font-[450] ${showFullText ? 'overflow-auto max-h-screen': review?.description.length > 160 ? 'overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}><p className='text-[1rem] font-[450] mt-3 ' >{review?.description}</p></div>}
                  {review?.description?.length > 160 ? !showFullText ? <button  className='group text-black font-medium mt-2  flex items-center gap-1 '  type='submit' onClick={() => setShowFullText(true)}><p className='h-1/2 border-b-2 border-b-transparent group-hover:border-b-black'>Show more</p> <i
                      className="fa-solid fa-angle-down ml-1 mt-1" ></i></button> : <button ref={refButtonText}  className='group rounded-xl  py-2 text-black font-medium mt-2 flex gap-1 items-center  '  type='submit' onClick={(e) => {
                    setShowFullText(false);
                    refButtonText.current.scrollTop = 0;
                  } }><p className=' border-b-transparent border-b-2 group-hover:border-b-black '>Show Less</p> <i
                      className="fa-solid fa-angle-up ml-0.5 mt-1  " ></i></button> : null }

                  <div className='flex justify-between '>
                    <button className='bg-white w-36 inline-block font-medium rounded-2xl border-2 px-3 py-1 border-[#808080] flex items-center gap-2 mt-4 hover:bg-[#ddd] '><Link to={`/review/edit/${bookId}`} className='flex  gap-2'>
                      <img src='https://cdn-icons-png.flaticon.com/512/2985/2985043.png' className='w-5 inline-block' alt="pen edit review icon"/><p className='flex items-start  '>Edit Review</p></Link></button>

                  </div>
                </div>}
            <section id='Community_reviews'  className=' mt-12 lg:max-w-[70%]'><h2 className='text-[1.22rem] font-bold'>Community Reviews</h2>
              <div className='flex justify-start mt-4 gap-3 items-center '
              >
                {
                  stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-2xl self-center   ${(rating) - 0.99  > index && `text-[#faaf00]`} ` } key={index} ></i>

                    )
                  })
                }
                <p className='inline-block text-[1.7rem] font-medium ml-2 '>{book.rating.toFixed(2)} </p>
              </div>
              <div className='flex  gap-4 font-medium text-sm text-[#707070] mt-3'>
                <p>{book.amountOfRates} ratings</p> <p>{reviews?.length} reviews</p>
              </div>

              <ProgressBarSection book={book}  isHighlighted={isHighlighted} changeFilter={changeFilter}




              />
            </section>
            <section className='flex flex-col gap-6 mt-3'>
            {reviews?.map((review) => <OneReviewOrdinary key={review._id} review={review} refreshReviews={refresh}/>)}
          </section>
          </div>
        </div>
      </div>
    </div>
    </main>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author