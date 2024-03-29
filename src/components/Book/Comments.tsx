import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button} from "@chakra-ui/react";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {OneComment} from "./OneComment";
import {apiUrl} from "../../config/api";

export const Comments = (props:any) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((root:RootState) => root.user)
    const {formState:{errors}, handleSubmit, watch, register} = useForm();
    const {bookId} = useParams();
    const [comments ,setComments] = useState([])
    const [toggleComments, setToggleComments] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false);
    const refresh = async () => {
        const res = await axiosPrivate.get(`${apiUrl}/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}`);
        setComments(res.data.comments);
        const res2= await axiosPrivate.get(`${apiUrl}/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}/user/${user._id}`);
        console.log(res2.data)

            setLiked(res2.data.hasLiked)


    };
    useEffect(() => {
       void refresh();
    }, []);

    const toggleLike = async () => {
        if (liked){
            setLiked(false)
            await axiosPrivate.delete(`${apiUrl}/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}/user/${user._id}`);
        }else{
            setLiked(true)
            await axiosPrivate.put(`${apiUrl}/book/${bookId}/user/${props.personalReview.user._id}/review/${props.personalReview._id}/user/${user._id}`);
        };
        props.refresh()

    };
    const onSubmit =  async (data:any) => {
            const res = await axiosPrivate.put(`${apiUrl}/book/${bookId}/user/${user._id}/review/${props.personalReview._id}/comment`, data);
        void refresh();
        props.refresh();
    }
    const commentsToggle = () => {
        setToggleComments((prev) => !prev)
    }
    return (<>
    <div className='mt-4 '>
        <div className='text-[#808080] font-[500] flex gap-7 mb-2'>{props.personalReview?.likes.amount > 0 && <p>{props.personalReview?.likes.amount} likes</p>} {props.personalReview?.comments.length  > 0&&<p>{props.personalReview?.comments.length} comments</p>}</div>
       <div className='flex gap-2 items-center mb-2'><div className='flex gap-2 items-center cursor-pointer group' onClick={toggleLike}>

           {!liked ? <img src="https://cdn-icons-png.flaticon.com/512/739/739282.png" width={20} className='min-h-0 h-5' alt="thumbs up"/> : <img src="https://cdn-icons-png.flaticon.com/512/739/739231.png" width={20} className='min-h-0 h-5' alt="thumbs up active"/>}<p className='group-hover:border-b-2 border-b-2 border-b-transparent group-hover:border-black'>Like</p>
       </div> <div className='group flex items-center cursor-pointer'>
           <i className="fa-regular fa-comment scale-x-[-1] mr-2 ml-2 "/><p onClick={commentsToggle} className='cursor-pointer  group-hover:border-b-2 border-b-2 border-b-transparent group-hover:border-black'>Comment</p>
       </div></div>

        {toggleComments && comments.map((comment:any) => <OneComment comment={comment} personalReview={props.personalReview} refresh={refresh} refreshCommentsAndLikes={props.refresh} />)}
        { toggleComments &&
            <div className='relative '>   <form  onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <div className='flex h-10  '> <img className='min-h-0 overflow-hidden min-w-0 w-10 h-8 content-center self-center' src={user.base64Avatar} width={30} height={10} alt=""/>

                    <input className='border-[#707070] border-[1px] rounded-xl px-2 py-2 w-full ml-2  focus:outline-0 focus:border-black focus:border-2' {...register('comment')} type="text" placeholder='Add a comment'/>
                    <button className={`mt-0.5  py-2 bg-black text-white font-bold rounded-3xl px-[10px] py-1 absolute right-0 text-sm  ${watch('comment') ? 'block': 'hidden'}`} type='submit'>Post</button>
                </div>


            </form>
            </div>
        }
    </div></>)
}