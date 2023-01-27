import React, {useState} from 'react';
import {Comments} from "./Comments";
import dayjs from "dayjs";
import moment from "moment";

export const OneComment = (props:any) => {
    const [showFullText , setShowFullText] = useState(false)
    const [hoverSpoiler, setHoverSpoiler] = useState<boolean>(false);
    console.log(props)
    const [dayNumber,monthName,year]= (dayjs(props.comment?.date).format('DD/MMMM/YYYY')).split('/');
    console.log(moment(props.comment?.date).fromNow())
return  (<>
<div className='mb-3'>
    <div className='w-full flex'>
        <img className='w-[1.9rem] pt-1.5' src={props.comment.user.base64Avatar} alt=""/>
        <p className='ml-3 font-medium'>{props.comment.user.username}</p>
        <div className='flex   ml-3'>
            <p className='font-medium text-[#707070] font-normal'>{moment(props.comment?.date).fromNow()}</p>
        </div>
    </div>
    <div className='flex '>
        {props.comment?.commentMsg  &&   <div className={` max-h-[6rem] overflow-hidden  font-[450] ${showFullText ? 'overflow-auto max-h-screen': props.comment.commentMsg.length > 160 ? 'overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}><p className='text-[1rem] font-[450] mt-3 ' >{props.comment?.commentMsg}</p></div>}
        {props.comment?.commentMsg?.length > 160 ? !showFullText ? <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(true)}>Show more <i
            className="fa-solid fa-arrow-down" ></i></button> : <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(false)}>Show Less <i
            className="fa-solid fa-arrow-up" ></i></button> : null }



    </div>
</div>
   </>)
}