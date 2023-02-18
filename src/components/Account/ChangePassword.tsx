import React, {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import {UserInterface} from "./EditAccount";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const ChangePassword = () => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate()
  const {register, handleSubmit}  = useForm<{currentPassword:string, newPassword:string,verifyPassword:string, id:string}>({
    defaultValues:{
        id:params.userId,

    }
  });
  const onSend = (data:any) => {

    (async() => {
      const res = await axiosPrivate.put('http://localhost:3001/user/password',JSON.stringify(data));
    })()

  }


  return (<>
     <div className='w-[90%] mx-auto'>
       <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Change Password</h1>
       <form onSubmit={handleSubmit(onSend)}>
         <p className="mt-10 mb-3 w-[43vw]  mr-5">Current Password:</p>
         <Input type='password' {...register('currentPassword')}></Input>
         <p className="mt-4 mb-3 w-[43vw]  mr-5">New Password:</p>
         <Input type='password' {...register('newPassword')}></Input>
         <p className="mt-4 mb-3 w-[43vw]  mr-5">Verify Password:</p>
         <Input type='password' {...register('verifyPassword')}></Input>
         <div className='w-full flex justify-center mt-5'
         ><button className='p-4 bg-black text-2xl font-bold text-white rounded-md mx-auto  ' type={"submit"} >
Submit
         </button></div>
       </form>
     </div></>)
}