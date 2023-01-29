import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useParams} from "react-router";
import {Spinner} from "@chakra-ui/react";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {Comments} from "./Comments";


export const OneReviewOrdinary = (props:any) => {
    const {user} = useSelector((state: RootState) => state.user);
    const params = useParams();
    const stars = Array(5).fill(0);
    const axiosPrivate = useAxiosPrivate()
    const [personalRating ,setPersonalRating] = useState<number>();
    const [personalReview, setPersonalReview] = useState<any>();
    const [showFullText , setShowFullText] = useState(false)
    const [hoverSpoiler, setHoverSpoiler] = useState<boolean>(false);
    console.log(props)
    const refreshReview =  async () => {

            const res2 = await axiosPrivate.get(`http://localhost:3001/user/${props.review.user._id}/book/${params.bookId}`);
            setPersonalRating(res2.data.rating);
            setPersonalReview(res2.data);
    }
    useEffect(() => {
       refreshReview()
    },[]);
    const [dayNumber,monthName,year]= (dayjs(props.review?.date).format('DD/MMMM/YYYY')).split('/');
    while(!personalRating){
        return <Spinner/>
    }
    // @ts-ignore
    return (<>
        <div className='ml-[1.5rem]'>
            <div className='w-full flex'>
                <img className='w-[1.9rem] pt-1.5' src={props.review.user.base64Avatar} alt=""/>
                <p className='ml-3 font-medium'>{props.review.user.username}</p>
            </div>
            <div className='flex items-end gap-[4rem]'>
                { <div className='flex justify-start mt-3 mb-1'>
                    {
                        stars.map((_, index) => {
                            return (
                                <i className={`fa-solid fa-star text-md cursor-pointer ${(props.review.rating) > index  && `text-[#faaf00]`} ` } key={index}  ></i>

                            )
                        })
                    }
                </div>}
                <p className='font-medium'>{monthName} {dayNumber}, {year}</p>
            </div>
            <div className={`    font-[600] ${showFullText ? 'overflow-auto max-h-screen': props.review?.description?.length > 160 ?  'max-h-[6rem] overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `} onMouseOver={() => setHoverSpoiler(true)} onMouseLeave={() => setHoverSpoiler(false)}> {(props.review?.description && props.review.spoilers )&& <p className={`  inline  mt-3 bg-[#687a86] ${!hoverSpoiler ? 'text-transparent': 'text-black bg-[#e7e9ee]'}`} >{props.review?.description}</p>}</div>
            {props.review?.description && !props.review.spoilers &&   <div className={` max-h-[6rem] overflow-hidden  font-[450] ${showFullText ? 'overflow-auto max-h-screen': props.review.description.length > 160 ? 'overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}><p className='text-[1rem] font-[500] mt-3 ' >{props.review?.description}</p></div>}
            {props.review?.description?.length > 160 ? !showFullText ? <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(true)}>Show more <i
                className="fa-solid fa-arrow-down" ></i></button> : <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(false)}>Show Less <i
                className="fa-solid fa-arrow-up" ></i></button> : null }
            {<Comments personalReview={props.review} refresh={refreshReview}/>}

        </div>

    </>)
}