import React, {useEffect, useState} from "react";
import { BookEntity } from "../../../../BookWormBack/types/book/book-entity";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const AddToPersonalList = ({book}:{book:BookEntity}) => {
    const [modal, setModal] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        (async() => {
            const data = await axiosPrivate.get(`http://localhost:3000/book/${book.id}`);

        })()
    }, [])
    return <>
        <button onClick={() => setModal((prev) => !prev )} className='  text-black text-md font-bold  rounded-2xl h-full hover:text-blue-600 px-1 '>
        <b className='flex items-start h-full'>Add to list</b>
        </button>
        {modal && <div className='w-screen h-screen top-0  left-0 right-0 fixed z-20'>
            <div className='w-screen h-screen  bg-[#333]/[0.65]' onClick={() => setModal((prev) => !prev)}></div>
            <div className=' absolute   top-[50%]  left-[50%]  -translate-y-[50%] bg-amber-50 w-60 h-60 rounded-xl -translate-x-[50%]'>

            </div>
        </div>}
    </>
}