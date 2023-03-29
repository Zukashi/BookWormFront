import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {UserInterface} from "../Account/EditAccount";
import {Input, useToast} from "@chakra-ui/react";
import {CheckEmailCode} from "./CheckEmailCode";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import { apiUrl } from '../../config/api';

export const ResetPassword = () => {
    const {register, handleSubmit, getValues}  = useForm<any>();
    const toast = useToast()
    const [sentEmail, setSentEmail] = useState(false);
    const [code ,setCode] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const onSubmit = async (data:any) => {
        const res = await axiosPrivate.post(`${apiUrl}/user/reset-password`,JSON.stringify(data));
        setCode(res.data.code)
        setSentEmail(prev => !prev)
        toast({
            title: `Email sent`,
            description: `If email exists we've sent email to ${res.data.email} `,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (<>
        {   !sentEmail ?
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center flex-col h-screen w-screen gap-4'>
                <h2 className='font-medium text-3xl'>Input your email</h2>
                <Input {...register('email')} className='w-40 max-w-md'/>
                <button type={'submit'} className='px-4 py-2 bg-black text-white rounded-lg font-medium'>Send</button>
            </form>
            :   <CheckEmailCode code={code} email={getValues('email')}/>

        }
    </>)
}