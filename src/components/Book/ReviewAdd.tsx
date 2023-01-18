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
    const stars = Array(5).fill(0);
    const [review,setReview] = useState<any>({
        rating:0,
        description:'',
        status:'',
        user: {}
    });
    const [hover, setHover] = React.useState(0)

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/book/${bookId}`, {
                credentials:'include'
            });
            const data = await res.json();
            setBook(data);
           try{
               const res2 = await fetch(`http://localhost:3001/user/${user._id}/book/${data._id}`,{
                   credentials:'include'
               });

               const data2 = await res2.json();
               console.log(324);
               setReview(data2)
           }catch(e){
               console.log('error occurred')
           }
            setLoading(false)
        })();

    }, []);
    const handleMouseOver = (value:number) => {
        setHover(value)
    }
    const handleMouseLeave = (value:number) => {
        setHover(0)
    };
    const handleClick = async (value:number) => {
        setReview((prev:any) => ({
            ...prev,
            rating:value,
        }))
        // await fetch(`http://localhost:3001/book/${book?._id}/${value}`,{
        //     method:'PUT',
        //     credentials:'include'
        // })
    }
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
            {
                stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-xl cursor-pointer ${(hover || review.rating)  > index  && `text-[#faaf00]`} ` } key={index}  onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave}></i>

                    )
                })

            }
            <Textarea placeholder='Write a review (optional)'/>
            <div className='flex flex-col '><label>Spoilers?</label><Checkbox iconSize='' className='w-4 h-4  '/></div>
            <Button>Post</Button>
        </div>
    </>)
}