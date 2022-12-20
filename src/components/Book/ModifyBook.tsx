import React, {useEffect, useState} from 'react'
import { HomeAdminNav } from '../Home/AdminHome/HomeAdminNav'
import { useParams } from "react-router-dom"
import {Input} from "@chakra-ui/react";
import {Book} from "./AdminBookList";

export const ModifyBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState<Book|null>(null);;
    const [form ,setForm] = useState({
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
           const res = await fetch(`http://localhost:3001/book/${id}`)
           const data = await res.json();
           setBook(data);
           setForm(data)
        })()
    },[]);
    if (book === null) {
        return <h1>123</h1>;
    }
    return (<>
                <HomeAdminNav/>
                <div className='pt-20'></div>
                <Input value={form.title} onChange={(event) => updateForm(event.target.value,'title')}></Input>
    </>)
}