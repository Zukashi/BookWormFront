import React, {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {toast, ToastContainer} from 'react-toastify';
import * as yup from 'yup';
const schema = yup.object().shape({
    currentPassword:yup.string().required().min(8, 'Current Password must be at least 8 characters long').max(24, 'Current Password cannot be longer than 24 characters'),
    newPassword:yup.string().required().min(8, 'New Password must be at least 8 characters long').max(24, 'New Password cannot be longer than 24 characters'),
    verifyPassword:yup.string().required().min(8, 'Repeat Password must be at least 8 characters long').max(24, 'Repeat Password cannot be longer than 24 characters'),
}).required()
export const ChangePassword = () => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate()
  const {register, handleSubmit, formState:{errors}}  = useForm<{currentPassword:string, newPassword:string,verifyPassword:string, id:string}>({
    resolver:yupResolver(schema),
    defaultValues:{
        id:params.userId,

    }
  });
  const onSend = (data:any) => {

    (async() => {
      try{
        await axiosPrivate.put('http://localhost:3001/user/password',JSON.stringify(data));
        toast.success(`Password changed`, {
          position: toast.POSITION.BOTTOM_CENTER,
          theme:'dark',
          autoClose:3000
        });
      }catch(e:any){
        console.log(e)
        toast.error(e.response.data, {
          position: toast.POSITION.BOTTOM_CENTER,
          theme:'dark',
          autoClose:3000
        });
      }

    })()

  }


  return (<>
    <ToastContainer/>
     <div className='w-[90%] mx-auto'>
       <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Change Password</h1>
       <form onSubmit={handleSubmit(onSend)}>
         <p className="mt-10 mb-3 w-[43vw]  mr-5">Current Password:</p>
         <input type={'password'} className={`pr-20 w-full focus:outline-none focus:ring-2 focus:ring-black  px-4 py-2 rounded-md  flex ${errors.currentPassword?.type ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[1]`} `} {...register('currentPassword')}></input>
         <p>{errors.currentPassword?.message}</p>
         <p className="mt-4 mb-3 w-[43vw]  mr-5">New Password:</p>
         <input type={'password'} className={`pr-20 w-full focus:outline-none focus:ring-2 focus:ring-black  px-4 py-2 rounded-md  flex ${errors.newPassword?.type ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[1]`} `} {...register('newPassword')}></input>
         <p>{errors.newPassword?.message}</p>
         <p className="mt-4 mb-3 w-[43vw]  mr-5">Repeat New Password:</p>
         <input type={'password'} className={`pr-20 w-full focus:outline-none focus:ring-2 focus:ring-black  px-4 py-2 rounded-md  flex ${errors.verifyPassword?.type ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[1]`} `} {...register('verifyPassword')}></input>
         <p>{errors.verifyPassword?.message}</p>
         <div className='w-full flex justify-center mt-5'
         ><button className='p-4 bg-black text-2xl font-bold text-white rounded-md mx-auto  ' type={"submit"} >
Submit
         </button></div>
       </form>
     </div></>)
}