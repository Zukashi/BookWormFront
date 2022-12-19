import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

export const OneRowInBookListAdmin = ({book, i, refresh }:any,) => {
    console.log(i)
    const [author, setAuthor] = useState<any>([]);
    useEffect(() => {
        ( async () => {
            const res2 = await fetch(`http://localhost:3001/author${book.authors[0].key}`);
            const data2 = await res2.json();
            setAuthor(data2)
        })()
    }, [])

     const deleteBook = async () =>  {
        await fetch(`http://localhost:3001/book/${book._id}`,{
            method:'DELETE'
        })
         refresh();
    }

    return (<>
        <tr className='h-16 font-normal text-[16px]'>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt=""/></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{book.title}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>History</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{author.personal_name}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>About mercenary named Beso</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center'><button><Link to={`/modify/book/${book._id}`}><i
                className="fa-solid fa-pen-to-square"></i></Link></button>
                <button onClick={deleteBook}><i className="fa-solid fa-trash"></i></button></div>
            </td>
        </tr></>)
}