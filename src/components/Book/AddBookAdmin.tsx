import React, {useState} from 'react'
import {userUpdate} from "../../features/User/userSlice";
import {Button, Input, position, Spinner, useToast} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
let schema = yup.object().shape({
    isbn:yup.string().required().min(10).max(13),
})

export const AddBookAdmin = () => {
    const {register, handleSubmit, trigger, formState:{errors} , setError} = useForm<{isbn:string,title:string,author:string}>({
        resolver:yupResolver(schema)
    });
    const [loading ,setLoading] = useState<boolean>(false)
    const toast = useToast();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const onSubmit =  async (data:{isbn:string,title:string,author:string}) => {
        setLoading(true)
        try{
            await schema.validate(data)
            const res = await axiosPrivate.post('http://localhost:3001/book',JSON.stringify(data));
            toast({
                position:'top',
                title: 'Success',
                description: 'Book added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
            navigate('/admin/books')
        }catch(e:any){
            if(e?.response?.status === 404){
                toast({
                    position:'top',
                    title: 'Error',
                    description: e.response.data,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            if(e?.response?.status === 409){
                toast({
                    position:'top',
                    title: 'Error',
                    description: e.response.data,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
            if (e.response.status === 500){
                toast({
                    position:'top',
                    title: 'Error',
                    description: e.response.data,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setError('isbn', { type: 'custom', message: e?.response?.data?.message });
            setLoading(false)
        }

    }
    if(loading){
        return <div className='h-screen w-screen flex justify-center items-center '><Spinner size='xl'></Spinner></div>
    }
    return (<>

       <div className='w-screen h-screen flex items-center'>
        <div className='flex flex-col items-center w-full'>
            <p className='flex justify-center text-5xl font-medium mb-5'>Add book</p>
            <form  autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-11/12 mx-auto items-center'>

                <input type='number' style={{border:'none'}}{...register('isbn', {maxLength:13, required:true})} className={`focus:outline-none max-w-[300px] w-full focus:ring-2 focus:rounded-md px-3 py-2 mt-2 focus:ring focus:ring-blue-700 ring-2 rounded-md ring-black   placeholder:italic  ${errors.isbn?.message  && `bg-yellow-400/[.7]`}`} placeholder='isbn' ></input>
                {errors.isbn?.message && <p className='text-white-400 font-medium text-center pt-1' role="alert">{errors.isbn?.message}</p>}

                <button className='mt-5 max-w-[300px] ring-2 ring-black rounded-xl px-4 py-2 text-2xl font-bold hover:bg-black hover:text-white hover:ring-blue-500 ' type={'submit'} >Add</button>
            </form>
        </div>
       </div>

    </>)
}