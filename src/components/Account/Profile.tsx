import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useParams} from "react-router-dom";
import {Spinner} from "@chakra-ui/react";
import dayjs from "dayjs";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const axiosPrivate = useAxiosPrivate()

  const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        (async () => {
           const res = await axiosPrivate.get(`http://localhost:3001/user/${params.userId}`);
           setUser(res.data);
           setLoading(prev => !prev)
        })()
    }, []);

    while (loading){
        return <>
            <div className='pt-20'></div>
            <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
    }
    return (<>

    <section className='bg-gradient-to-r from-sky-800 to-indigo-900 w-screen h-screen bg-[#fbfcff] pt-20  '>
    <div className='w-[90vw] h-full flex flex-col mx-auto'>
      <div className='flex flex-col gap-5 p-[25px] text-center  bg-white  pb-[2vw] shadow-black shadow-2xl rounded-md w-full items-center'>
          <img className='w-40' src={user?.base64Avatar} alt=""/>
        <h1 className='text-3xl font-[600]'>{user?.username}</h1>
      </div>
      <div className="flex flex-col gap-5 pt-[2vw] pb-[2vw] text-center w-[90vw] bg-white  mt-10  rounded-md shadow-black shadow-2xl">
        <h2 className='text-left text-[1.5rem] font-[600] ml-[1rem] tracking-tight'>Personal Details</h2>
          <div className='w-full  border-b-gray border-b-[1px] '></div>
       <div className='flex flex-col'>

           <div className='flex flex-col items-start ml-[1rem] mb-[1.3rem] '>

             <h3 className='font-bold leading-5'>Birthday </h3>
             <p className='font-medium'>{((dayjs(user.dateOfBirth).format('DD/MMMM')).split('/')).join(' ')}</p>

           </div>
         <div className='flex flex-col items-start ml-[1rem] mb-[1.3rem] '>
             <h3 className='font-bold leading-5'>Country </h3>
              <p className='font-medium'>{user.country ? user.country : "Unknown"}</p>
           </div>
         <div className='flex flex-col items-start ml-[1rem] mb-[1.3rem] '>
             <h3 className='font-bold leading-5'>Phone  </h3>
              <p>{user.phone ? user.phone :'Unknown'}</p>
           </div>
         <div className='flex flex-col items-start ml-[1rem]  mb-[1.3rem]'>
             <h3 className='font-bold leading-5'>Email  </h3>
           <p className='font-medium'>{user.email ? user.email : 'Unknown'}</p>
           </div>
         </div>

      </div>
    </div>

    </section>

  </>)
}