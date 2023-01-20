import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Book} from "./OneBook";
import {Button, Checkbox, Select, Spinner, Textarea} from "@chakra-ui/react";
import {useForm} from "react-hook-form";


export const ReviewEdit = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const {register, handleSubmit, setValue} = useForm();
    const [book, setBook] = useState<Book|null>();
    const navigate = useNavigate();
    const {bookId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const stars = Array(5).fill(0);
    const [review,setReview] = useState<any>({
        rating:0,
        description:'',
        status:'',
        user: {},
        spoilers:false,
    });
    const [lastReviewRating, setLastReviewRating] = useState(null)
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
                setValue('description', data2.desc)
                setValue('spoilers', data2.spoilers)
                setReview(data2);
                setLastReviewRating(data2.rating)
            }catch(e){
                console.log('error occurred')
            }
            setLoading(false)
        })();

    }, []);
    const deleteReview = async () => {
        navigate(`${`/book/${book?._id}`}`)
        await fetch(`http://localhost:3001/book/${book?._id}/user/${user._id}/review/${lastReviewRating}`,{
            method:'DELETE',
            credentials:'include'
        });
        window.location.reload();

    }
    const onSubmit = async (data:any) => {
        data.rating = review.rating
        try{
            await fetch(`http://localhost:3001/user/${user._id}/book/${bookId}`,{
                credentials:'include',
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(data)
            });
            await fetch(`http://localhost:3001/book/${book?._id}/${lastReviewRating}`,{
                method:'DELETE',
                credentials:'include'
            })
            await fetch(`http://localhost:3001/book/${book?._id}/${review.rating}`,{
                method:'PUT',
                credentials:'include'
            });
            navigate(`/book/${bookId}`)
        }catch (e) {

        }
    }
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
    }
    while(loading || !book){
        return  <Spinner/>
    }
    return (<>
        <HomeNav/>
        <div className='pt-20 w-[90vw] mx-auto'>

            <img src={`https://covers.openlibrary.org/b/isbn/${book?.isbn}-M.jpg`} className='w-20 float-left mr-3' alt=""/>
            <h2 className='font-[700] font-sans text-2xl'>{book?.title}</h2>
            <h3> by {book?.author}</h3>
            <div className='flex items-center'>  {
                stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-sm cursor-pointer ${(book?.rating) -1 > index  && `text-[#faaf00]`} ` } key={index} ></i>

                    )
                })
            }
                <p className='inline-block text-[1rem] ml-1    font-medium'>{book?.rating.toFixed(2)} </p>
            </div>

            <div className='mb-16'></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="status"></label>
                <div className='flex justify-center'><Select className='h-5 w-[20vw]' w={'40%'} {...register('status')}>
                    <option value="read">Read</option>
                    <option value="currentlyReading">Currently Reading</option>
                </Select></div>
                <h3 className='w-full flex justify-center mt-2  mb-1'>Your rating: </h3>
              <div className='flex justify-center mb-4'>  {
                  stars.map((_, index) => {
                      return (
                          <i className={`fa-solid fa-star text-3xl cursor-pointer ${(hover || review.rating)  > index  && `text-[#faaf00]`} ` } key={index}  onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave}></i>

                      )
                  })

              }</div>
               <div className=' flex justify-center'> <Textarea {...register('description')} className='' placeholder='Write a review (optional)'/></div>
                <div className='flex mt-4 '><label><Checkbox {...register('spoilers')} iconSize='' className='w-4 h-4 mt-1 mr-2  '/>This review contains spoilers</label></div>
                <input type='submit' className='font-medium text-xl bg-black px-4 py-2 rounded-xl text-white mt-5'></input>
                <button className='font-medium text-xl bg-white px-4 py-2 rounded-xl text-black border-2 border-amber-300 border-green-400 bg-blue-500 ml-4' onClick={deleteReview}>Delete</button>
            </form>

        </div>
    </>)
}