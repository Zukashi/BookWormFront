import React from 'react';
import {useForm} from "react-hook-form";
import {Input, useToast} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../config/api";

export const CreateNewPassword = (props:any) => {
    const {register, handleSubmit} = useForm();
    const toast = useToast();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const sendForm = async(data:any) => {
        if(data.newPassword === data.repeatNewPassword){
         await axiosPrivate.put(`${apiUrl}/user/${props.user._id}/newPassword`,JSON.stringify({newPassword:data.newPassword}))
            toast({
                title: `Password Changed`,
                description: `Password has been changed`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            navigate('/login')
            }else{
            toast({
                title: `Warning`,
                description: `Password are not the same`,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (<>
        <form onSubmit={handleSubmit(sendForm)} className='flex justify-center items-center flex-col h-screen w-screen gap-4'>
            <label >New Password</label>
            <Input {...register('newPassword')} className='w-40 max-w-md' type='password'></Input>
            <label>Repeat New Password</label>
            <Input {...register('repeatNewPassword')} className='w-40 max-w-md' type='password'></Input>
            <button className='px-4 py-2 bg-black text-white rounded-lg font-medium' type='submit'>Change password</button>
        </form>
    </>)

}