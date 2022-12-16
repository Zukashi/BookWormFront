import React from 'react'
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";

export const AdminBookList = () => {
    return (<>
        <HomeNavAdmin/>
    <div className='pt-20'></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto mt-20'>
            <table className='h-[84px]  '>
                <th>
                <tr className='h-16 flex'>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6]'><p>No</p></td>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6] '>Book Image</td>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6] '>Book Name</td>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6] '>Book Category</td>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6] '>Book Author</td>
                    <td className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[5px] border-[ #dee2e6] '>Book Description</td>
                </tr>
                </th>
            </table>
        </div>
    </>)
}