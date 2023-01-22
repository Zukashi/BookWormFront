import React, {useState} from 'react';
import {Button, Input, InputGroup, InputRightElement, Link as ChakraLink, useToast} from "@chakra-ui/react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {User, userUpdate} from '../../features/User/userSlice'
import {useForm} from "react-hook-form";

export interface Login {
    user:User,
    accessToken:string,
    error:any,
};


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [error,setError] = useState(false);
    const {register, handleSubmit}  = useForm<any>();
    const toast = useToast();

    const onSubmit =  async (formData:any) => {
        try{
            const res = await fetch('http://localhost:3001/login',{
                method:'POST',
                credentials: 'include',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(formData),
            });
            const data:Login = await res.json();
            console.log(data)


            dispatch(userUpdate({
                user:data.user,
                token:data.accessToken
            }));

            navigate('/home')


        }catch(e){
            toast({
                position:'top',
                title: 'Error',
                description: "Password or username invalid.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setError(true)
        }

    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
                <div className='flex flex-col absolute top-60 '>
                    <h2 className='text-white text-center mb-[2vh] text-3xl'>Login</h2>
                    <label><span className="block text-lg font-medium text-slate-700">Username:</span></label>
                    <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className={`focus:outline-none focus:ring focus:ring-blue-700   ${error && 'ring ring-[#ff0000] ring-[1.5px]'} `}focusBorderColor='none'   {...register('username')}></Input>
                    <label><span className="block text-lg font-medium text-slate-700 mt-2 ">Password:</span></label>
                    <InputGroup size='md'>

                        <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className={` focus:outline-none focus:ring focus:ring-blue-700   ${error && 'ring ring-[#ff0000] ring-[1.5px]'} `} {...register('password')} focusBorderColor='none' type={show ? 'text' : 'password'}></Input> <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick} className=''>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    {error && <h1 className='text-center text-red-700 pt-2 font-semibold '>Password or username invalid.</h1>}
                    <div className='w-full flex justify-center'><input className='mt-2 bg-loginBtn px-3 py-3 w-[7rem] rounded-md font-medium text-2xl text-white' type={"submit"} ></input></div>
                    <Link to='/reset-password' className='mt-3'><ChakraLink className='flex justify-center'>Forgot Password?</ChakraLink></Link>
                    <Link to='/create-account'  className='mt-1'><ChakraLink className='flex justify-center'>Don't have an account?</ChakraLink></Link>
                </div>
            </div>
        </form>

        </>)

}