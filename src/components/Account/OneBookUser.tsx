import React, {useEffect, useState} from 'react';
import {Button, Input, Spinner} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {Link} from "react-router-dom";

export const OneBookUser = (props:{id:string}) => {
    const axiosPrivate = useAxiosPrivate();
    const [book, setBook] = useState<any>();
    const [loading ,setLoading] = useState<boolean>(true)
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/book/${props.id}`)
            setBook(res.data)
            setLoading((prev) => !prev)
        })()
    }, []);
    while (loading || !book){
        return <>
            <div className='pt-20'></div>
            <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
    }
    return (<>
        <div className='flex relative'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
            <Link to={`/book/${book._id}`} className='relative  w-[180px] '><Button pos='absolute'  className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><div className='h-[250px] flex justify-center items-center'><img  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40"   alt=""/></div>

            </Link>

        </div>

            <div className='inline-block -ml-10 mt-20'><p className='text-[15px] font-bold w-40 leading-5
    ml-16'>{book.title}</p>
                <p className='text-[16px] mt-2 ml-16'>{book.author} </p>
                <i className="fa-solid fa-cart-shopping fa-xl cursor-pointer ml-16 "></i>
            </div>
            </div>
    </>)
}