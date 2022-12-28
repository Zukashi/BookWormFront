import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

export const OneRowInUserListAdmin = ({user, i, refresh }:any,) => {

    const deleteUser = async () =>  {
        await fetch(`http://localhost:3001/user/${user._id}`,{
            method:'DELETE',
            credentials:'include',
        })
        refresh();
    }
    return (<>
        <tr className='h-16 font-normal text-[16px] max-h-[h-20] overflow-y-scroll'>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>IMG</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{user.username}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{user.firstName.length !== 0 ? user.firstName:<Link className='decoration-solid underline text-violet-600' to={`modify/${user._id}`}><p className='w-full h-full flex flex-col justify-center'>Add first Name</p></Link>}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-24 overflow-y-scroll '>{user.lastName.length !== 0 ? user.lastName:<Link className='decoration-solid underline text-violet-600' to={`modify/${user._id}`}> <p className='flex flex-col justify-center w-full h-full'>Add last name</p></Link>}</div></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{user.city}</td>
            <td className='p-3 border-[#dee2e6] border-[1px]  '><p className='h-24 overflow-y-auto '>{user.age}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center'><button><Link to={`modify/${user._id}`}><i
                className="fa-solid fa-pen-to-square"></i></Link></button>
                <button onClick={deleteUser}><i className="fa-solid fa-trash"></i></button></div>
            </td>
        </tr></>)
}