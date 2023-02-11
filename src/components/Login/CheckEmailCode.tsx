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
    console.log(watch('code'))
    const onSubmit = async (data:{code:string}) => {
        console.log(data, props)
        if (data.code === props?.code?.toString()){
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
                <PinInput onChange={(e) => setValue('code', e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
                <input type="submit"/>


            </form>
            :<CreateNewPassword user={user}/>
        }

    </>)
}