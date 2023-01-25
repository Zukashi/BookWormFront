import React, {useState} from 'react'
import {userUpdate} from "../../features/User/userSlice";
import {Button, Input} from "@chakra-ui/react";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";

export const AddBookAdmin = () => {
    const [form, setForm] = useState({
        isbn:'',
        title:'',
        author:'',
    });
    const axiosPrivate = useAxiosPrivate()
    const updateForm = (value:string,fieldName:string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value,
        }))
    }
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await axiosPrivate.post('http://localhost:3001/book',JSON.stringify(form));

    }
    return (<>
        <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic  ' placeholder='isbn' focusBorderColor='none'   onChange={(e:any) => updateForm(e.target.value,'isbn')}></Input>
        <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic  ' placeholder='title' focusBorderColor='none'   onChange={(e:any) => updateForm(e.target.value,'title')}></Input>
        <Input style={{border:'none', backgroundColor:'rgba(240, 239, 235,0.3)'}}className='focus:outline-none focus:ring focus:ring-blue-700  placeholder:italic  ' placeholder='author' focusBorderColor='none'   onChange={(e:any) => updateForm(e.target.value,'author')}></Input>
        <Button className='mt-5 ' colorScheme='blackAlpha' onClick={(e:any) => onSubmit(e)}>Add</Button>

    </>)
}