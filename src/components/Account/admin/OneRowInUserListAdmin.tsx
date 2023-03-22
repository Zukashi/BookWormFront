import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";

export const OneRowInUserListAdmin = ({user, i, refresh }:any,) => {
    const axiosPrivate = useAxiosPrivate()
    const deleteUser = async () =>  {
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}`)
        refresh();
    }
    return (<>
        <tr className='h-16 font-normal text-[16px] max-h-[h-20] overflow-y-scroll'>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{i+1}</td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><img src={`${user.base64Avatar}`} alt=""/></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><p className='overflow-y-auto h-32 flex items-center'>{user.username}</p></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><span className='overflow-y-auto h-32 flex items-center'>{user.firstName.length !== 0 ? user.firstName:<Link className='decoration-solid underline text-violet-600' to={`modify/${user._id}`}><p className='w-full h-full flex flex-col justify-center'>Add first Name</p></Link>}</span></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-24 overflow-y-auto flex items-center '>{user.lastName.length !== 0 ? user.lastName:<Link className='decoration-solid underline text-violet-600' to={`modify/${user._id}`}> <p className='flex flex-col justify-center w-full h-full'>Add last name</p></Link>}</div></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '>{user.city}</td>
            <td className='p-3 border-[#dee2e6] border-[1px]  '><div className='h-24 overflow-y-auto '>{user.age !== 0 ? <p className='flex flex-col justify-center w-full h-full'>{user.age}</p> : <Link className='decoration-solid underline text-violet-600' to={`modify/${user._id}`}><p className='flex flex-col justify-center w-full h-full'>Add age</p></Link>}</div></td>
            <td className='p-3 border-[#dee2e6] border-[1px] '><div className='h-full w-full  flex flex-col gap-3 justify-center'><button><Link to={`modify/${user._id}`}><i
                className="fa-solid fa-pen-to-square"></i></Link></button>
                <button onClick={deleteUser}><i className="fa-solid fa-trash"></i></button></div>
            </td>
        </tr></>)
}