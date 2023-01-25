import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {UserInterface} from "../Account/EditAccount";
import {Input, useToast} from "@chakra-ui/react";
import {CheckEmailCode} from "./CheckEmailCode";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const ResetPassword = () => {
    const {register, handleSubmit, getValues}  = useForm<any>();
    const toast = useToast()
    const [sentEmail, setSentEmail] = useState(false);
    const [code ,setCode] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const onSubmit = async (data:any) => {
        console.log(123)
        const res = await axiosPrivate.post(`http://localhost:3001/user/reset-password`,JSON.stringify(data));
        setCode(res.data.code)
        setSentEmail(prev => !prev)
        toast({
            title: `Email sent`,
            description: `If email exists we've sent email to ${res.data.email} `,
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