import React, {FormEvent, useState} from 'react';
import {Button, Input, InputGroup, InputRightElement, useToast} from "@chakra-ui/react";
import * as yup from 'yup';
import {useForm, SubmitHandler } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
type Inputs = {
    username: string,
    password: string,
    email:string,
};
let schemaUserRegister = yup.object().shape({
    username: yup.string().required().max(18,'username cannot be longer than 18 characters').min(6,'username must be at least 6 characters long'),
    email: yup.string().required().email('must be a valid email'),
    password: yup.string().required().min(8, 'must be at least 8 characters long').max(24,`password can't be longer than 24 characters`)
});
export const Register = () => {
    const [show, setShow] = React.useState(false);
    const toast = useToast();
    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<Inputs>({
        resolver:yupResolver(schemaUserRegister)
    });
    console.log(errors)
    const handleClick = () => setShow(!show)
    const axiosPrivate = useAxiosPrivate();
    console.log(watch("username"))
    const submit: SubmitHandler<Inputs> =  async (data) => {
        const isValid = await schemaUserRegister.isValid(data);
        if (!isValid) return null;
        try{
            await axiosPrivate.post('http://localhost:3001/register',JSON.stringify(data));
            toast({
                position:'top',
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }catch(e:any){
            console.log(e.response)
            if(e?.response?.status === 409 && e?.response?.data.type === 'email'){
                setError('email', { type: 'custom', message: e?.response?.data?.message });
                toast({
                    position:'top',
                    title: 'warning',
                    description: e.response.data.message,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
            else if(e?.response?.status === 409 && e?.response?.data.type === 'username'){
                setError('username', { type: 'custom', message: e?.response?.data?.message });
                toast({
                    position:'top',
                    title: 'warning',
                    description: e.response.data.message,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    }
    return (<>
        <div className='bg-gradient-to-r w-screen h-screen from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col '>
                 <h2 className='text-white text-center mb-[2vh] text-3xl'>Register</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <label ><span className="block text-lg font-medium text-slate-700">Username:</span><input className={`focus:outline-none focus:ring-2 focus:ring-black  px-4 py-2 rounded-md  flex ${errors.username?.type ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[.3]`} `} {...register('username')}></input>{errors.username && <p className='text-white-400 font-medium w-52' role="alert">{errors.username?.message}</p>}</label>
                    <label ><span className="block text-lg font-medium text-slate-700">Email:</span> <input className={` focus:outline-none focus:ring-2 focus:ring-black  px-4 py-2 rounded-md flex ${errors.email?.type  ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[.3]`}`} {...register('email')} ></input>{errors.email && <p className='text-white-400 font-medium w-52 flex justify-center' role="alert">{errors.email?.message}</p>}</label>
                    <InputGroup size='md'>
                        <label ><span className='block text-lg font-medium text-slate-700'>Password:</span> <input   className={`focus:outline-none    focus:ring-2 focus:ring-black  px-4 py-2 rounded-md ${errors.password?.type  ? `bg-yellow-400/[.7]` :`bg-[#f0efeb]/[.3]`}  `}  {...register('password')}  type={show ? 'text' : 'password'}></input>{errors.password && <p className='text-white-400 font-medium w-52' role="alert">{errors.password?.message}</p>}</label> <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick} className='mt-[57px]'>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    <Button className='mt-5 ' colorScheme='blackAlpha'  type='submit'>Register</Button></form>
            </div>
        </div>


    </>)
}