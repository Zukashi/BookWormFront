import React, {FormEvent, useState} from 'react';
import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import * as yup from 'yup';

let schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email('must be a valid email'),
    password: yup.string().required(),
});
export const Register = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',

    });

    const submit =  async (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await schema.isValid(form);
        console.log(res);
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
        <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col absolute top-60 '>
                <h2 className='text-white text-center mb-[2vh] text-3xl'>Register</h2>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white 'placeholder='User Name' focusBorderColor='none' onChange={(e:any) =>updateForm(e.target.value,'username')}></Input>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-3 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white 'placeholder='Email' focusBorderColor='none' onChange={(e:any) =>updateForm(e.target.value,'email')} ></Input>
                <InputGroup size='md'>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-3 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white ' onChange={(e:any) =>updateForm(e.target.value,'password')}placeholder='Password' focusBorderColor='none' type={show ? 'text' : 'password'}></Input> <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} className='mt-6'>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
                </InputGroup>
                <Button className='mt-5 ' colorScheme='blackAlpha' onClick={(e:any) => submit(e)} type='submit'>Register</Button>
            </div>
        </div>


    </>)
}