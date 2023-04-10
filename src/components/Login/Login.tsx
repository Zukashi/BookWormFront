import React, {useState} from 'react';
import {Button, Input, InputGroup, InputRightElement, Link as ChakraLink, useToast} from "@chakra-ui/react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {User, userUpdate} from '../../features/User/userSlice'
import {useForm} from "react-hook-form";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {SpinnerComponent} from "../SpinnerComponent";

export interface Login {
    user:any,
    accessToken:string,
    error:any,
};


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [error,setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit}  = useForm<any>();
    const toast = useToast();
    const axiosPrivate = useAxiosPrivate();
    const onSubmit =  async (formData:any) => {
        try{
            setLoading(true)
            const res = await axiosPrivate.post(`login`,JSON.stringify(formData));
            dispatch(userUpdate({
                user:res.data.user,
                token:res.data.accessToken
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
        }finally{
            setLoading(false)
        }

    }

    const onSubmitDemo =  async () => {

            const res = await axiosPrivate.get('demo');
            dispatch(userUpdate({
                user:res.data.user,
                token:res.data.accessToken
            }));

            navigate('/home')




    };
    if(loading){
        return <SpinnerComponent/>
    }
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
            <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-end justify-center'>
                <div className='flex flex-col  h-full justify-center '>
                    <h2 className='text-white text-center mb-[2vh] text-3xl'>Login</h2>
                    <label><span className="block text-lg font-medium text-slate-700">Username:</span></label>
                    <input  style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className={`pr-16 focus:border-0 focus:ring-black focus:ring-1  focus:outline-none focus:ring      px-4 py-2 rounded-lg   ${error && 'ring ring-[#ff0000] ring-[1.5px]'} `}   {...register('username')}></input>
                    <label><span className="block text-lg font-medium text-slate-700 mt-2 ">Password:</span></label>
                    <InputGroup size='md'>

                        <input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className={`pr-16 focus:border-0 rounded-lg  focus:outline-none focus:ring focus:ring-black focus:ring-1  px-4 py-2   ${error && 'ring ring-[#ff0000] ring-[1.5px]'} `} {...register('password')}  type={show ? 'text' : 'password'}></input> <InputRightElement width='4.5rem'>
                        <button type='button'   onClick={handleClick} className='h-[1.75rem] bg-[#000]/[0.35] text-white rounded-2xl font-medium px-2 '>
                            {show ? 'Hide' : 'Show'}
                        </button>
                    </InputRightElement>
                    </InputGroup>
                    {error && <h1 className='text-center text-red-700 pt-2 font-semibold '>Password or username invalid.</h1>}
                    <div className='w-full flex justify-center'><button className='mt-2  px-3 py-3 w-[7rem] bg-[#000]/[0.36] rounded-md font-medium text-2xl text-white' type={"submit"} >Login</button></div>
                    <div className='w-full flex justify-center'><div className='text-center mt-2 cursor-pointer px-3 py-3 w-[7rem] bg-[#000]/[0.36] rounded-md font-medium text-2xl text-white' onClick={() => onSubmitDemo()}  >Demo</div></div>
                    <Link to='/reset-password' className='mt-3'><ChakraLink className='flex justify-center'>Forgot Password?</ChakraLink></Link>
                    <Link to='/register'  className='mt-1'><ChakraLink className='flex justify-center'>Don't have an account?</ChakraLink></Link>
                </div>
            </div>
        </form>

        </>)

}