import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Book} from "./OneBook";
import {Button, Checkbox, Select, Spinner, Textarea} from "@chakra-ui/react";


export const ReviewAdd = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const [book, setBook] = useState<Book|null>();
    const {bookId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [review,setReview] = useState<any>({
        rating:0,
        description:'',
        status:'',
        user: {}
    });
    const [hover, setHover] = React.useState(0);
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/book/${bookId}`, {
                credentials:'include'
            });
            const data = await res.json();
            setBook(data);
            const res2 = await fetch(`http://localhost:3001/user/${user._id}/book/${data._id}`,{
                credentials:'include'
            });

            // const data2 = await res2.json();
            console.log(324)
            // setRating(data2.rating)
            setLoading(false)
        })();

    }, []);
    while(loading){
        return  <Spinner/>
    }
    return (<>
    <HomeNav/>
        <div className='pt-20 w-[90vw]'>

            <img src={`https://covers.openlibrary.org/b/isbn/${book?.isbn}-M.jpg`} className='w-24 float-left' alt=""/>
            <h2>{book?.title}</h2>
            <h3> by {book?.author}</h3>
            <div className='mb-20'>123</div>
            <Select className='h-5 w-[40vw]'>
                <option value="read">Read</option>
            </Select>
            <h3>Rate it</h3>
            <Textarea placeholder='Write a review (optional)'/>
            <div className='flex flex-col '><label>Spoilers?</label><Checkbox iconSize='' className='w-4 h-4  '/></div>
            <Button>Post</Button>
        </div>
    </>)
}