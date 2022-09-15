import React, {useState} from 'react';
import {Button, Input, InputGroup, InputRightElement, Link as ChakraLink} from "@chakra-ui/react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userUpdate} from '../../features/User/userSlice'

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [error,setError] = useState('')
    const [form, setForm] = useState({
        username:'',
        password:'',
    });

    const updateForm = (value:string,fieldName:string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value.trim(),
        }))
    }
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(form),
        });
        const data = await res.json();
        if (data.error){
            setError('error 404')
        }else{

            dispatch(userUpdate(data));
            navigate("/home")
        }

    }

    return (<>
        <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col absolute top-60 '>
                <h2 className='text-white text-center mb-[2vh] text-3xl'>Login</h2>
                <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white 'placeholder='User Name' focusBorderColor='none'   onChange={(e:any) => updateForm(e.target.value,'username')}></Input>
                <InputGroup size='md'>
                    <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='mt-3 focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic placeholder:text-white ' onChange={(e:any) =>updateForm(e.target.value,'password')}placeholder='Password' focusBorderColor='none' type={show ? 'text' : 'password'}></Input> <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} className='mt-6'>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
                </InputGroup>
                {error && <h1 className='text-center text-red-700 font-semibold '>podales niepoprawne dane</h1>}
                <Button className='mt-5 ' colorScheme='blackAlpha' onClick={(e:any) => onSubmit(e)}>Login</Button>
                <Link to='/reset-password' className='mt-3'><ChakraLink className='flex justify-center'>Forgot Password?</ChakraLink></Link>
                <Link to='/create-account'  className='mt-1'><ChakraLink className='flex justify-center'>Don't have an account?</ChakraLink></Link>
            </div>
        </div>

        </>)

}