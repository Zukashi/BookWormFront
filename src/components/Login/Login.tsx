import React from 'react';
import {Button, Input, Link as ChakraLink} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export const Login = () => {
    return (<>
        <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col absolute top-60 '>
                <h2 className='text-white text-center mb-[2vh] text-3xl'>Login</h2>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white 'placeholder='User Name' focusBorderColor='none'  ></Input>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-5 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white'placeholder='Password' focusBorderColor='none'  ></Input>
                <Button className='mt-5 ' colorScheme='blackAlpha'>Login</Button>
                <Link to='/reset-password' className='mt-3'><ChakraLink className='flex justify-center'>Forgot Password?</ChakraLink></Link>
                <Link to='/create-account'  className='mt-1'><ChakraLink className='flex justify-center'>Don't have an account?</ChakraLink></Link>
            </div>
        </div>

        </>)

}