import React, {useState} from 'react';
import {Input, PinInput, PinInputField, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {CreateNewPassword} from "./CreateNewPassword";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const CheckEmailCode =(props:{code:number | null, email:string}) => {
    const {register, handleSubmit, setValue, watch}  = useForm<any>();
    const toast = useToast();
    const [isValid ,setIsValid] = useState(false);
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const onSubmit = async (data:{code:string}) => {
        if (data.code === props?.code?.toString()){
            try{
                const res = await axiosPrivate.put(`http://localhost:3001/user/reset-password/confirm`,JSON.stringify({email:props.email}));

                setUser(res.data);
                setIsValid(prev => !prev)
                toast({
                    title: `Password Reset`,
                    description: `Password has been cleared`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }catch(e){

                    toast({
                        title:'Failure',
                        description:'Email doesnt exist in our database',
                        status:'error',
                        duration:5000,
                        isClosable:true,
                    });


            }

        }
    }
    return (<>
        {   !isValid ?
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center flex-col h-screen w-screen gap-4'>
                <h1>INPUT CODE</h1>
                <div className='flex'>
                    <PinInput onChange={(e) => setValue('code', e)}>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </div>
                <button className='px-4 py-2 bg-black text-white rounded-lg font-medium'>Proceed</button>


            </form>
            :<CreateNewPassword user={user}/>
        }

    </>)
}