import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {apiUrl} from "../../config/api";

interface Props {
    book: any,
    refresh: () => void,
}
export const OneBookFavorite = ({book,refresh}:Props) => {
    const refImg = useRef<HTMLImageElement>(null);
    const [favorite ,setFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true)
    const {user} = useSelector((state: RootState) => state.user);
    const [rating,setRating] = useState<number>(0);
    const [hover, setHover] = React.useState(0);
    const stars = Array(5).fill(0);
    const axiosPrivate = useAxiosPrivate()
    const handleClick = async (value:number) => {
        setRating(value)
        await axiosPrivate.put(`${apiUrl}/book/${book._id}/${value}`)
    }

    const handleMouseOver = (value:number) => {
        setHover(value)
    }
    const handleMouseLeave = (value:number) => {
        setHover(0)
    }
    const mouseEntered = () => {
        if (refImg.current === null || refImg.current === undefined){
            return null;
        } else{
            refImg.current.classList.add('opacity-50')
        }
    };
    useEffect(() => {
        ( async () => {
            const res = await axiosPrivate.get(`${apiUrl}/user/${user._id}/favorites`);
            const res2 = await axiosPrivate.get(`${apiUrl}/book/${book._id}`);
            setRating(res2.data.rating)
            // const res3 = await fetch(`${apiUrl}/books`, {
            //   credentials:'include'
            // });
            // const data3 = await res3.json();
            res.data.forEach((favorite:any) => {
                if (favorite.isbn?.includes(book.isbn)){
                    setFavorite(true)
                }
            });
        })();
        const timer = setTimeout(() => {
            setLoading(false)
        }, 400)
        return () => clearInterval(timer)
    },[]);

    const changeFavorite = () => {
        if(favorite === false){
            setFavorite(true);
            (async() => {

                await axiosPrivate.put(`${apiUrl}/user/${user._id}/favorite`,JSON.stringify(book))
                refresh();
            })();

        }else{
            setFavorite(false);
            (async() => {
                // @ts-ignore
                await axiosPrivate.delete(`${apiUrl}/user/${user._id}/book/${book._id}/favorite`,JSON.stringify(book))
                refresh();
            })();

        }

    };
    const colors  = {
        orange: '#faaf00',
        grey:'#a9a9a9'
    }


    const mouseLeft = () => {
        if (refImg.current === null || refImg.current === undefined){
            return null;
        }
        refImg.current.classList.remove('opacity-50')
    }
    while (loading){
        return <>
            <div className='pt-20'></div>
            <div className='w-screen h-screen absolute top-[100%] left-[30%]'><Spinner size='xl'  pos='absolute' left={50}/></div></>
    }
    return (<>
        <div className='flex relative w-full justify-center'> <div className='mt-4 lg:bg-black w-[180px] inline-block'>
            <Link to='/works/OL27213498M' className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><div className='h-[250px] flex justify-center items-center'><img ref={refImg} src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}   className="inline-block cursor-default w-40" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/></div>

            </Link>

        </div>
            <div className='inline-block -ml-10 mt-20'><p className='text-[15px] font-bold w-40 leading-5
    ml-16'>{book.title}</p>
                <p className='text-[16px] mt-2 ml-16'>{book.author} </p>
                <i className="fa-solid fa-cart-shopping fa-xl cursor-pointer ml-16 "></i>
                <div className='w-32 h-7 absolute right-[3.5rem] bottom-[10%] '>
                    {
                        stars.map((_, index) => {
                            return (
                                <i className={`fa-solid fa-star text-xl cursor-pointer ${(hover || rating) > index + 1 && `text-[#faaf00]`} ` } key={index}  onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave}></i>

                            )
                        })
                    }
                    <p className='inline-block text-[1.2rem] font-medium'>{book.rating.toFixed(2)}</p>
                </div>

                {!favorite ?  <button onClick={changeFavorite} className='mt-6'><i className="fa-regular fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button> :
                    <button onClick={changeFavorite} className='mt-6'> <i className="fa-solid fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button>} </div>



        </div>
    </>)
}