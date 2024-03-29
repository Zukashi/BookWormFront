import React, {useState} from 'react';
import dayjs from "dayjs";
import moment from "moment";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useParams} from "react-router";
import {
    AlertDialog, AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { Link } from 'react-router-dom';
import {apiUrl} from "../../config/api";
export const OneComment = (props:any) => {
    const [showFullText , setShowFullText] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null);




    const {user, token} = useSelector((state:RootState) => state.user)
    const axiosPrivate = useAxiosPrivate();
    const {bookId} = useParams();
    const deleteComment = async () => {
        await axiosPrivate.delete(`${apiUrl}/book/${bookId}/user/${user._id}/review/${props.personalReview._id}/comment/${props.comment._id}`);
        props.refresh();
        props.refreshCommentsAndLikes()
    }

    return  (<>



    <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
    >
        <AlertDialogOverlay />

        <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                Are you sure you want to delete your comment?
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    No
                </Button>
                <Button colorScheme='red' ml={3} onClick={deleteComment}>
                    Yes
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
<div className='mb-3'>
    <div className='w-full flex '>
        <Link to={`/user/${props.comment.user._id}`}><img className='w-[1.9rem] pt-1.5 absolute cursor-pointer' src={props.comment.user.base64Avatar} alt=""/></Link>
        <div className='flex ml-7 justify-between w-full mr-4'>
           <div className='flex '>
               <Link  to={`/user/${props.comment.user._id}`}><span className='border-b-2 border-b-transparent hover:border-b-black ml-3 font-medium h-5  '>{props.comment.user.username}</span></Link>
               <div className='flex   ml-3'>
                   <p className='font-medium text-[#707070] font-normal'>{moment(props.comment?.date).fromNow()}</p>
               </div>
           </div>
            {props.comment.user._id === user._id &&   <img src='https://cdn-icons-png.flaticon.com/512/484/484662.png' width={20} className='font-bold text-xl cursor-pointer' onClick={onOpen} alt='trash icon'></img>}
        </div>
    </div>
    <div className='flex  ml-10 '>
        {props.comment?.commentMsg  &&   <div className={` max-h-[6rem] overflow-hidden  font-[450] ${showFullText ? 'overflow-auto max-h-screen': props.comment.commentMsg.length > 160 ? 'overflow-hidden relative before:content-[""] before:absolute before:h-12 before:w-full before:bottom-0               before:bg-gradient-to-b before:from-transparent before:to-white ' : ''} `}><p className='text-[1rem] font-[500]  ' >{props.comment?.commentMsg}</p></div>}
        {props.comment?.commentMsg?.length > 160 ? !showFullText ? <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(true)}>Show more <i
            className="fa-solid fa-arrow-down" ></i></button> : <button  className='bg-black rounded-xl px-4 py-2 text-white font-medium mt-5 '  type='submit' onClick={() => setShowFullText(false)}>Show Less <i
            className="fa-solid fa-arrow-up" ></i></button> : null }



    </div>
</div>
   </>)
}