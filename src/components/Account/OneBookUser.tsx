import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Progress,
    Select,
    Spinner,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {current} from "@reduxjs/toolkit";

export const OneBookUser = (props:{id:string, status:string, refresh: () => Promise<void>}) => {
    const axiosPrivate = useAxiosPrivate();
    const [book, setBook] = useState<any>();
    const {register , handleSubmit, formState:{errors}} = useForm<{status:string}>()
    const [loading ,setLoading] = useState<boolean>(true);
    const {user} = useSelector((state:RootState) => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentStatus, setCurrentStatus] = useState(props.status);
    const [completed ,setCompleted] = useState<number>(0)
    console.log(props)
    console.log(props.status)
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/book/${props.id}`);
            console.log(res.data)
            setBook(res.data)
            setLoading((prev) => !prev)
        })()
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
        return <>
            <div className='pt-20'></div>
            <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
    }
    return (<>

        <div className='flex relative gap-4'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
            <Link to={`/book/${book._id}`} className='  flex justify-center  items-center '><div className='h-[250px] flex justify-center items-center'><img  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40"   alt=""/></div>

            </Link>

        </div>
            <div className='inline-block  mt-20 w-2/5'><p className='text-[15px] font-bold w-40 leading-5
    '>{book.title}</p>
                <p className='text-[16px] mt-2 '>{book.author} </p>

                    <div className='w-full flex justify-end'>

                        <label htmlFor="default"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        </label>
                        <select defaultValue={props.status} onChange={(e) => {
                            if(e.target.value !== props.status){
                                setCurrentStatus(e.target.value)
                                onOpen()
                            }
                        }
                        }
                                className="max-w-[10rem] bg-gray-50 outline-none border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                     <option className='text-ellipsis overflow-hidden whitespace-nowrap' value="read">Read</option>
                     <option className='text-ellipsis overflow-hidden whitespace-nowrap' value="currentlyReading">Currently Reading</option>
                     <option className='text-ellipsis overflow-hidden whitespace-nowrap' value="wantToRead">Want To Read</option>
                 </select>
                    </div>
                {props.status === 'currentlyReading' && <div className='h-5 w-full bg-[#e0e0de] rounded-3xl m-2'>
                    <div className={`h-full w-[${completed}%] bg-blue-700 rounded-inherit `}>
                        <span className='p-5 text-white font-bold'></span>
                    </div>
                </div>}
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