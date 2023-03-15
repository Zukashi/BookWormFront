import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {SpinnerComponent} from "../../SpinnerComponent";

export const OneRowInBookListAdmin = ({book, i, refresh }:{book:BookEntity, i:number, refresh: () => void},) => {
    const axiosPrivate = useAxiosPrivate();


     const deleteBook = async () =>  {
        await axiosPrivate.delete(`http://localhost:3001/book/${book._id}`)
         refresh();
    };
    if(!book) return <SpinnerComponent/>
    return (<>
        <tr className='h-16 font-normal text-[16px] max-h-[h-20] overflow-y-scroll'>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] max-w-[100px]'><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}  alt="book image"/></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{book.title}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center text-xl font-medium'>{book.rating.toFixed(2)}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{book?.publishers?.length !== 0 ? book?.publishers?.map((publisher:string,i:number) => <span key={i}>{publisher}</span>):<Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`}><p className='w-full h-full flex flex-col justify-center'>Add publishers</p></Link>}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-24 overflow-y-scroll '>{book?.subjects?.length !== 0 ? book?.subjects?.map((subject:string, i:number) => <p key={i}>{subject}</p>):<Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`} aria-label={`edit ${book.title}`}> <p className='flex flex-col justify-center w-full h-full'>Add subjects</p></Link>}</div></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{book.author}</td>
            <td className='p-3 border-[#dee2e6] border-[1px]  '><p className='h-24 overflow-y-auto '>{typeof book.description === 'string' ? book.description : (book as any).description.value ?  (book as any).description.value : <Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`}><p className='w-full h-full flex flex-col justify-center'>Add book description</p></Link>}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center items-center'><Link to={`modify/${book._id}`}><i
                className="fa-solid fa-pen-to-square"></i></Link>
                <button  aria-label='delete book' onClick={deleteBook}><i className="fa-solid fa-trash"></i></button></div>
            </td>
        </tr></>)
}