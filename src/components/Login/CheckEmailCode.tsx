import React, {useState} from 'react';
import {Input, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {CreateNewPassword} from "./CreateNewPassword";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const CheckEmailCode =(props:{code:string | null, email:string}) => {
    const {register, handleSubmit}  = useForm<any>();
    const toast = useToast();
    const [isValid ,setIsValid] = useState(false);
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate()
    const onSubmit = async (data:{code:string}) => {
        if (data.code === props.code){
            const res = await axiosPrivate.put(`http://localhost:3001/user/reset-password/confirm`,JSON.stringify({email:props.email}));

            setUser(res.data)
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