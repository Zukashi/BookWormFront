import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export const Favorites = (props:any) => {
    const [favorite ,setFavorite] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        (async () => {
            if (props.favorites.favorites.includes(props.book.isbn)){
                setFavorite(true)
            }
        })()
    })
    const changeFavorite = () => {
        if(favorite === false){
            setFavorite(true);
            (async() => {

                await fetch(`http://localhost:3001/user/${user._id}/favorite`,{
                    method:"PUT",
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({isbn:props.book.isbn})
                })
            })()
        }else{
            setFavorite(false);
            (async() => {
                await fetch(`http://localhost:3001/user/${user._id}/favorite`,{
                    method:"DELETE",
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({isbn:props.book.isbn})
                })
            })()
        }
    }
    return (<>
        {!favorite ?  <button onClick={changeFavorite} className='mt-6'><i className="fa-regular fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button> :
            <button onClick={changeFavorite} className='mt-6'> <i className="fa-solid fa-heart fa-xl text-red-500 ml-4 cursor-pointer"></i></button>}</>)
}