import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {UserInterface} from "../Account/EditAccount";
import {Input, useToast} from "@chakra-ui/react";
import {CheckEmailCode} from "./CheckEmailCode";

export const ResetPassword = () => {
    const {register, handleSubmit, getValues}  = useForm<any>();
    const toast = useToast()
    const [sentEmail, setSentEmail] = useState(false);
    const [code ,setCode] = useState(null);
    const onSubmit = async (data:any) => {
        console.log(123)
        const res = await fetch(`http://localhost:3001/user/reset-password`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(data)
        });
        console.log(res)
        const code = await res.json();
        console.log(code)
        setCode(code.code)
        setSentEmail(prev => !prev)
        toast({
            title: `Email sent`,
            description: `If email exists we've sent email to ${data.email} `,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (<>
        {   !sentEmail ?
            <form onSubmit={handleSubmit(onSubmit)}>

                <Input {...register('email')}/>
                <input type="submit"/>
            </form>
            :   <CheckEmailCode code={code} email={getValues('email')}/>

        }
    </>)
}