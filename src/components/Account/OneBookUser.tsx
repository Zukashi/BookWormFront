import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useLocation} from "react-router";
import {StatusCurrent} from "../Repeatable/StatusCurrent";
import {SpinnerComponent} from "../../SpinnerComponent";

export const OneBookUser = (props:{id:{
    book:string
    }, status:string, refresh: () => Promise<void>}) => {
    const axiosPrivate = useAxiosPrivate();
    const [book, setBook] = useState<any>();
    const {register , handleSubmit, formState:{errors}} = useForm<{status:string}>()
    const [loading ,setLoading] = useState<boolean>(true);
    const {user} = useSelector((state:RootState) => state.user)
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentStatus, setCurrentStatus] = useState(props.status);
    const [completed ,setCompleted] = useState<number>(0);
    console.log( typeof ((completed / book?.number_of_pages) * 100).toFixed(0))
    const refresh = async () => {
        console.log(props)
            const res = await axiosPrivate.get(`http://localhost:3001/book/${props.id}`);
            const res2 = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/book/${props.id}/${props.status}`);
            setCompleted(res2.data.progress)
            setBook(res.data)
            setLoading(false)

    }
    useEffect(() => {
        refresh()
    }, []);
    const changeStatus =async  (oldStatus:string, bookId:string) => {
        setLoading(true)
            await axiosPrivate.put(`http://localhost:3001/book/${bookId}/user/${user._id}/changeStatus`, JSON.stringify({
                statuses:{
                    oldStatus:oldStatus,
                    newStatus:currentStatus
                }
            }))
            await props.refresh();
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }
    while (loading || !book ){
        return null}
    return (<>

        <div className='flex relative gap-2  w-[95%] mx-auto'> <div className='mt-4 lg:bg-black  inline-block'>
            <Link to={`/book/${book._id}`} className='  flex justify-center  items-center '><div className='h-[250px] flex justify-center items-center w-36'><img  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className=" cursor-default w-36"   alt=""/></div>

            </Link>

        </div>
            <div className='inline-block  mt-20 w-3/5'><p className='text-[15px] font-bold w-40 leading-5
    '>{book.title}</p>
                <p className='text-[16px] mt-2 '>{book.author} </p>

                    <div className='w-full flex justify-start'>

                        <label htmlFor="default"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        </label>
                       <StatusCurrent refresh={props.refresh} onDelete={props.refresh} book={book}/>
                    </div>
                {props.status === 'currentlyReading' && completed !== 0 &&<div className='flex gap-0.5 items-center'> <p className='text-[12px] font-medium '>Progress</p><div className='h-3 w-20 bg-[#e0e0de] '>
                    <div style={{width:`${((completed / book?.number_of_pages) * 100).toFixed(0) && `${((completed / book?.number_of_pages) * 100).toFixed(0)}%`}`}} className={`h-3 w-[20%]  bg-blue-700 rounded-inherit `}>
                        <span className='p-5 text-white font-bold'></span>
                    </div>
                </div>
                <p className='text-[12px] font-bold'>{((completed / book?.number_of_pages) * 100).toFixed(0)}% Done</p>
                </div>}
                {
                    props.status === 'currentlyReading' &&   <Link state={{location, status:props.status}} to={`/user/${user._id}/book/${book._id}/${props.status}/progress`}><button className='px-1 py-0.5 bg-[#F4F1EA] text-black border-2 border-[#bbb] font-medium cursor-pointer rounded-xl '>Update Progress</button></Link>
                }
            </div>
            </div>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Do you wish to change category of {book.title}?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={() => {
                        changeStatus(props.status, book._id)
                        onClose()
                    }
                    }>
                        Yes
                    </Button>
                    <Button  onClick={() => {
                        console.log(props.status)
                        setCurrentStatus(props.status)
                        onClose()}}
                             colorScheme='red'>No</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}