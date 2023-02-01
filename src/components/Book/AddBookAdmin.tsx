import React, {useState} from 'react'
import {userUpdate} from "../../features/User/userSlice";
import {Button, Input, Spinner, useToast} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
let schema = yup.object().shape({
    isbn:yup.string().required().min(10).max(13),
    title:yup.string(),
    author:yup.string(),
})

export const AddBookAdmin = () => {
    const {register, handleSubmit, trigger, formState:{errors}} = useForm<{isbn:string,title:string,author:string}>({
        resolver:yupResolver(schema)
    });
    const [loading ,setLoading] = useState<boolean>(false)
    const toast = useToast();
    const axiosPrivate = useAxiosPrivate()
    const onSubmit =  async (data:any) => {
        setLoading(true)
        try{
            await schema.validate(data)
            const res = await axiosPrivate.post('http://localhost:3001/book',JSON.stringify(data));
            setLoading(false)
        }catch(e:unknown){
            // @ts-ignore
            if(e?.response?.status === 404){
                toast({
                    position:'top',
                    title: 'Error',
                    description: "Invalid isbn number",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            }
            setLoading(false)
        }

    }
    if(loading){
        return <div className='h-screen w-screen flex justify-center items-center '><Spinner size='xl'></Spinner></div>
    }
    return (<>

       <div className='w-screen h-screen flex items-center'>
           <h1 className='absolute font-semibold  absolute w-screen h-screen -z-10 '><p className='flex justify-center mt-[20%] text-[3em]'>Add book</p></h1>
           <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-11/12 mx-auto'>
               <input type='number' style={{border:'none'}}{...register('isbn')}className={`focus:outline-none w-full focus:ring-2 focus:rounded-md px-3 py-2 mt-2 focus:ring focus:ring-blue-700 ring-2 rounded-md ring-black   placeholder:italic  ${errors.isbn?.message  && `bg-yellow-400/[.7]`}`} placeholder='isbn' ></input>
               {errors.isbn?.message && <p className='text-white-400 font-medium text-center' role="alert">{errors.isbn?.message}</p>}
               <input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}{...register('title')}className='focus:outline-none w-full focus:ring-2 focus:rounded-md px-3 py-2 mt-2 focus:ring focus:ring-blue-700 ring-2 rounded-md ring-black   placeholder:italic ' placeholder='title' ></input>
               <input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}{...register('author')}className='focus:outline-none w-full focus:ring-2 focus:rounded-md px-3 py-2 mt-2 focus:ring focus:ring-blue-700 ring-2 rounded-md ring-black   placeholder:italic  '  placeholder='author' ></input>
               <button className='mt-5 ring-2 ring-black rounded-xl px-4 py-2 text-2xl font-bold hover:bg-black hover:text-white hover:ring-blue-500 ' type={'submit'} >Add</button>
           </form>
       </div>

    </>)
}