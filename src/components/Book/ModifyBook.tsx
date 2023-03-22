import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav'
import {useNavigate, useParams} from "react-router-dom"
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import { HomeNav } from '../Home/HomeNav';

export const ModifyBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState<any|null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [form ,setForm] = useState({
        _id:'',
        title:'',
        author:'',
        description:'',
        subjects:'',
        subject_people:'',
        publishers:'',
        imageSrc:''
    });
    const updateForm = (value:string,fieldName:string) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]:value,
        }))
    }
    useEffect(() => {
        (async() => {
           const res = await axiosPrivate.get(`http://localhost:3001/book/${id}`)
           setBook(res.data);
           setForm(res.data);
            console.log(res.data)
           if(res.data.description.value){
               setForm((prev) => ({
                   ...prev,
                   description:res.data?.description?.value
               }))
           }
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
        await axiosPrivate.put(`http://localhost:3001/book/${book._id}`,JSON.stringify(form));
        navigate('/admin/books')
    }
    return (<>
                <HomeNav/>
                <div className='pt-20'></div>
        <div className='w-[90vw] m-auto max-w-[500px] mb-20'><form action="">
            <div><h2 className='mb-2'>Title:</h2>
                <input ref={inputRef} className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.title} onChange={(event) => updateForm(event.target.value,'title')}/></div>
            <div><h2 className='mb-2'>Image:</h2>
                <input ref={inputRef} placeholder='http://...' className='mb-6 w-[100%] px-3 py-1.5 outline-none ring-[#E2E8F0] ring-1 focus:ring-[#3182ce] focus:ring-2 rounded-md' value={form.imageSrc} onChange={(event) => updateForm(event.target.value,'imageSrc')}/></div>
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