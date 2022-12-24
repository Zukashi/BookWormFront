import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";


export const Profile = () => {
  const {user} = useSelector((state:RootState) => state.user)
  return (<>

    <section className='bg-gradient-to-r from-sky-800 to-indigo-900 w-screen h-screen bg-[#fbfcff]  '>
    <div>
      <div className='flex flex-col gap-5 p-[25px] text-center w-[30vw] bg-white absolute top-10 left-20 pb-[2vw] shadow-black shadow-2xl rounded-md'>
        <h2 >picture</h2>
        <h1 className='text-3xl font-[600]'>{user.username}</h1>
        <h3>job</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, iusto!</p>
      </div>
      <div className="flex flex-col gap-5 pt-[2vw] pb-[2vw] text-center w-[30vw] bg-white  absolute bottom-40 left-20 rounded-md shadow-black shadow-2xl">
        <h2 className='text-left text-2xl font-[600]'>Personal Details</h2>
       <div className='flex flex-col'>

           <div className='flex justify-between'>

             <p>birthday : </p>
             <p>#date</p>

           </div>
         <div className='flex justify-between'>
             <p>address </p>
              <p>#address</p>
           </div>
         <div className='flex justify-between'>
             <p>phone  </p>
              <p>#phone</p>
           </div>
         <div className='flex justify-between'>
             <p>email  </p>
           <p>#{user.email}</p>
           </div>
         </div>

      </div>
    </div>

    </section>

  </>)
}