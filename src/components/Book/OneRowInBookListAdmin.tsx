import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

export const OneRowInBookListAdmin = ({book, i, refresh }:any,) => {
    const [author, setAuthor] = useState<any>([]);
    useEffect(() => {
        ( async () => {
            const res2 = await fetch(`http://localhost:3001/author${book.authors[0].key}`,{
                credentials:'include'
            });
            const data2 = await res2.json();
            setAuthor(data2)
        })()
    }, [])

     const deleteBook = async () =>  {
        await fetch(`http://localhost:3001/book/${book._id}`,{
            method:'DELETE',
            credentials:'include'
        })
         refresh();
    }
    return (<>
        <tr className='h-16 font-normal text-[16px] max-h-[h-20] overflow-y-scroll'>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{book.title}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center text-xl font-medium'>{book.rating.toFixed(2)}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{book.publishers.length !== 0 ? book.publishers.map((publisher:string,i:number) => <span key={i}>{publisher}</span>):<Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`}><p className='w-full h-full flex flex-col justify-center'>Add publishers</p></Link>}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-24 overflow-y-scroll '>{book.subjects.length !== 0 ? book.subjects.map((subject:string, i:number) => <p key={i}>{subject}</p>):<Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`}> <p className='flex flex-col justify-center w-full h-full'>Add subjects</p></Link>}</div></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{book.author}</td>
            <td className='p-3 border-[#dee2e6] border-[1px]  '><p className='h-24 overflow-y-auto '>{book.description ? book.description : <Link className='decoration-solid underline text-violet-600' to={`modify/${book._id}`}><p className='w-full h-full flex flex-col justify-center'>Add book description</p></Link>}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center'><button><Link to={`modify/${book._id}`}><i
                className="fa-solid fa-pen-to-square"></i></Link></button>
                <button onClick={deleteBook}><i className="fa-solid fa-trash"></i></button></div>
            </td>
        </tr></>)
}