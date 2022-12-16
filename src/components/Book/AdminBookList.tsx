import React from 'react'
import {HomeNavAdmin} from "../Home/AdminHome/HomeNavAdmin";

export const AdminBookList = () => {
    return (<>
        <HomeNavAdmin/>
    <div className='pt-20'></div>
        <div className='overflow-x-auto max-w-[1000vw] w-[90vw] mx-auto '>
            <table className='h-[84px]  '>

                <tr className='h-16'>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[#dee2e6]'><p className='flex items-end h-5/6'>No</p></th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '>Book Image</th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '>Book Name</th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '>Book Category</th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '>Book Author</th>
                    <th className='py-3 pl-3 pr-[30px] h-[84px] border-[2px] border-x-[1px] border-b-[3px] border-[ #dee2e6] '>Book Description</th>
                </tr>

                <tbody>
                <tr className='h-16'>
                    <td className='p-3 border-[#dee2e6] border-[1px] max-w-5'>1</td>
                    <td>http:///</td>
                    <td>End of me</td>
                    <td>History</td>
                    <td>Beso</td>
                    <td>About mercenary named Beso</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>)
}