import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav'
import {useNavigate, useParams} from "react-router-dom"
import {Book} from "./AdminBookList";

export const ModifyBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState<Book|null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    console.log(book)
    const [form ,setForm] = useState({
        _id:book?._id,
        title:book?.title,
        author:book?.author,
        description:book?.description,
        subjects:book?.subjects,
        subject_people:book?.subject_people,
        publishers:book?.publishers,

    });
    const updateForm = (value:string,fieldName:string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value,
        }))
    }
    useEffect(() => {
        (async() => {
           const res = await fetch(`http://localhost:3001/book/${id}`, {
               credentials:'include'
           })
           const data = await res.json();
           setBook(data);
           setForm(data)
        })()
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[]);
    if (book === null) {
        return <h1>123</h1>;
    }
    const onSubmit:MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/book/${book._id}`,{
            method:'PUT',
            credentials:'include',
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
            <div><h2 className='mb-2'>Title:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.title} onChange={(event) => updateForm(event.target.value,'title')}/></div>
            <div><h2 className='mb-2'>Publishers:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.publishers} onChange={(event) => updateForm(event.target.value,'publishers')}/></div>
            <div><h2 className='mb-2'>Subjects:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.subjects} onChange={(event) => updateForm(event.target.value,'subjects')}/></div>
            <div><h2 className='mb-2'>Author:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.author} onChange={(event) => updateForm(event.target.value,'author')}/></div>
            <h2 className='mb-2'>Description:</h2>
            <div><textarea rows={5} ref={textAreaRef} className='mb-6 w-[100%] h-[150px] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.description} onChange={(event) => updateForm(event.target.value,'description')}/></div>
            <div className='w-full flex justify-center'><button onClick={onSubmit} className='font-bold bg-black text-white text-xl rounded-xl border-[2px] px-8 py-4'>Update</button></div>
        </form></div>
    </>)
}