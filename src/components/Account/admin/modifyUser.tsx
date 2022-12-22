import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {HomeAdminNav} from "../../Home/AdminHome/HomeAdminNav";
import {User} from "./AdminUserList";

export const ModifyUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState<User|null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [form ,setForm] = useState({
        _id:user?._id,
        username:user?.username,
        age:user?.age,
        city:user?.city,
        firstName:user?.firstName,
        lastName:user?.lastName,

    });
    const updateForm = (value:string,fieldName:string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value,
        }))
    }
    useEffect(() => {
        (async() => {
            const res = await fetch(`http://localhost:3001/user/${id}`)
            const data = await res.json();
            setUser(data);
            setForm(data)
        })()
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[]);
    if (user === null) {
        return <h1>123</h1>;
    }
    const onSubmit:MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/user/admin/${user._id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(form)
        });
        navigate('/admin/books')
    }
    return (<>
        <HomeAdminNav/>
        <div className='pt-20'></div>
        <div className='w-[90vw] m-auto'><form action="">
            <div><h2 className='mb-2'>Username:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.username} onChange={(event) => updateForm(event.target.value,'username')}/></div>
            <div><h2 className='mb-2'>Age:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.age} onChange={(event) => updateForm(event.target.value,'age')}/></div>
            <div><h2 className='mb-2'>City:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.city} onChange={(event) => updateForm(event.target.value,'city')}/></div>
            <div><h2 className='mb-2'>First Name:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.firstName} onChange={(event) => updateForm(event.target.value,'firstName')}/></div>
            <h2 className='mb-2'>Last Name:</h2>
            <div><input  ref={inputRef} className='mb-6 w-[100%]  px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.lastName} onChange={(event) => updateForm(event.target.value,'lastName')}/></div>
            <div className='w-full flex justify-center'><button onClick={onSubmit} className='font-bold bg-black text-white text-xl rounded-xl border-[2px] px-8 py-4'>Update</button></div>
        </form></div>
    </>)
}