import React, {FormEvent, useState} from 'react';
import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import * as yup from 'yup';
import {useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
    username: string,
    password: string,
    email:string,
};
let schema = yup.object().shape({
    username: yup.string().required().max(18,'username cannot be longer than 18 characters').min(6,'username must be at least 6 characters long'),
    email: yup.string().required().email('must be a valid email'),
    password: yup.string().min(8, 'must be at least 8 characters long').required().max(24,`password can't be longer than 24 characters`)
});
export const Register = () => {
    const [show, setShow] = React.useState(false);;
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const handleClick = () => setShow(!show)
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',

    });
    console.log(watch("username"))
    const submit: SubmitHandler<Inputs> =  async (data) => {
        console.log(data)
        const isValid = await schema.isValid(form);
        if (!isValid) return null;
        await fetch('http://localhost:3001/register',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(form)
        });
    }

    const updateForm = (value:string, fieldName: string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value.trim(),
        }))
    }

    return (<>
        <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col absolute top-60 '>
                 <h2 className='text-white text-center mb-[2vh] text-3xl'>Register</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white flex 'placeholder='User Name' focusBorderColor='none' {...register('username')}></Input>
                    <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-3 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white 'placeholder='Email' focusBorderColor='none' {...register('email')} ></Input>
                    <InputGroup size='md'>
                        <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-3 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white ' {...register('password')} placeholder='Password' focusBorderColor='none' type={show ? 'text' : 'password'}></Input> <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick} className='mt-6'>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    <Button className='mt-5 ' colorScheme='blackAlpha'  type='submit'>Register</Button></form>
            </div>
        </div>


    </>)
}