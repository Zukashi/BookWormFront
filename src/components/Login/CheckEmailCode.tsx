import React, {useState} from 'react';
import {Input, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {CreateNewPassword} from "./CreateNewPassword";

export const CheckEmailCode =(props:any) => {
    const {register, handleSubmit}  = useForm<any>();
    const toast = useToast();
    const [isValid ,setIsValid] = useState(false);
    const [user, setUser] = useState()
    const onSubmit = async (data:any) => {
        if (data.code === props.code){
            const res = await fetch(`http://localhost:3001/user/reset-password/confirm`,{
                credentials:'include',
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({email:props.email})
            });
            const data = await res.json();
            setUser(data)
            setIsValid(prev => !prev)
            toast({
                title: `Password Reset`,
                description: `Password has been cleared`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

        }else{
            toast({
                title:'Failure',
                description:'Incorrect code',
                status:'error',
                duration:9000,
                isClosable:true,
            })
        }
    }
    return (<>
        {   !isValid ?
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>INPUT CODE</h1>
                <Input placeholder='code' {...register('code')}></Input>
                <input type="submit"/>


            </form>
            :<CreateNewPassword user={user}/>
        }

    </>)
}