import React, {FormEvent, useState} from 'react';
import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import * as yup from 'yup';
import {useForm, SubmitHandler } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver:yupResolver(schema)
    });
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
        console.log(isValid)
        if (!isValid) return null;
        // await fetch('http://localhost:3001/register',{
        //     method:'POST',
        //     headers:{
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify(form)
        // });
    }

    const updateForm = (value:string, fieldName: string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value.trim(),
        }))
    }

    return (<>
        <div className='bg-gradient-to-r w-screen h-screen from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col '>
                 <h2 className='text-white text-center mb-[2vh] text-3xl'>Register</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <label ><span className="block text-lg font-medium text-slate-700">Username:</span><Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white flex ' focusBorderColor='none' {...register('username')}></Input></label>
                    <label ><span className="block text-lg font-medium text-slate-700">Email:</span> <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className=' focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white ' focusBorderColor='none' {...register('email')} ></Input></label>
                    <InputGroup size='md'>
                        <label ><span className='block text-lg font-medium text-slate-700'>Password</span> <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className=' focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white ' {...register('password')} focusBorderColor='none' type={show ? 'text' : 'password'}></Input>{errors.email && <p role="alert">{errors.email?.message}</p>}</label> <InputRightElement width='4.5rem'>
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