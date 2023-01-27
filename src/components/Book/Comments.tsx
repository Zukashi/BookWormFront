import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button} from "@chakra-ui/react";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {OneComment} from "./OneComment";

export const Comments = (props:any) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((root:RootState) => root.user)
    const {formState:{errors}, handleSubmit, watch, register} = useForm();
    const {bookId} = useParams();
    const [comments ,setComments] = useState([])

    console.log(props);
    const refresh = async () => {
        const res = await axiosPrivate.get(`http://localhost:3001/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}`)
        setComments(res.data)
    }
    useEffect(() => {

       refresh()
    }, [])
    const onSubmit =  async (data:any) => {
        console.log(1234)
            await axiosPrivate.put(`http://localhost:3001/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}/comment`, data);
        refresh()
    }
    console.log(watch('comment'))
    return (<>
    <div>
       <div> <p><i className="fa-regular fa-comment scale-x-[-1] mr-3"/>Comment</p></div>
        <div className='w-full h-[2px] bg-green-200 mt-5 mb-5'></div>
        {comments.map((comment:any) => <OneComment comment={comment}/>)}
      <div className='relative '>   <form  onSubmit={handleSubmit(onSubmit)}>
          <div className='flex h-10  '> <img className='min-h-0 overflow-hidden min-w-0 w-10 h-8 content-center self-center' src={props.personalReview.user.base64Avatar} width={30} height={10} alt=""/>

              <input className='border-black border-2 rounded-xl px-2 py-2 w-full ml-2' {...register('comment')} type="text" placeholder='Add a comment'/>

          </div>

          <button className={`mt-0.5 bg-black text-white font-bold rounded-3xl px-[10px] py-1 absolute right-0 text-sm  ${watch('comment') ? 'block': 'hidden'}`} type='submit'>Post</button>
      </form>
      </div>
    </div></>)
}