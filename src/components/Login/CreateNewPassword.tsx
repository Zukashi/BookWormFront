import React from 'react';
import {useForm} from "react-hook-form";
import {Input, useToast} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const CreateNewPassword = (props:any) => {
    const {register, handleSubmit} = useForm();
    const toast = useToast();
    const axiosPrivate = useAxiosPrivate();
    const sendForm = async(data:any) => {
        if(data.newPassword === data.repeatNewPassword){
         await axiosPrivate.put(`http://localhost:3001/user/${props.user._id}/newPassword`,JSON.stringify({newPassword:data.newPassword}))
            toast({
                title: `Password Changed`,
                description: `Password has been changed`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            }
    }
    return (<>
        <form onSubmit={handleSubmit(sendForm)}>
            <label >New Password</label>
            <Input {...register('newPassword')} type='password'></Input>
            <label>Repeat New Password</label>
            <Input {...register('repeatNewPassword')} type='password'></Input>
            <Input type="submit"/>
        </form>
    </>)

}