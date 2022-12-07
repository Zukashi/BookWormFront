import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const OneBook = () => {
  const refImg = useRef<HTMLImageElement>(null);
  const [favorite ,setFavorite] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const mouseEntered = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    } else{
      refImg.current.classList.add('opacity-50')
    }
  }
  const changeFavorite = () => {
      if(favorite === false){
        setFavorite(true);
        (async() => {

          await fetch(`http://localhost:3001/user/${user._id}/favorite`,{
            method:"PUT",
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify({isbn:'1471156265'})
          })
        })()
      }
  }
  const mouseLeft = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    }
    refImg.current.classList.remove('opacity-50')
  }
  return (<> <div className='mt-4 bg-black w-[180px] inline-block'>
    <Link to='/works/OL27213498M' className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><img ref={refImg} src="https://covers.openlibrary.org/b/isbn/1471156265-M.jpg"  className="inline-block cursor-default" onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/>

    </Link>

  </div>
    <div className='inline-block -ml-10'><p className='text-[1vw] font-bold w-40 leading-5'>It Ends With Us</p>
      <p className='text-[0.74vw] mt-2'>COLLEN HOOVER</p>
      <p className='font-bold mb-2'>$99</p>
      <i className="fa-solid fa-cart-shopping fa-lg cursor-pointer"></i>
     {!favorite ?  <button onClick={changeFavorite}><i className="fa-regular fa-heart fa-lg text-red-500 ml-4 cursor-pointer"></i></button> :
         <button onClick={() => setFavorite(false)}> <i className="fa-solid fa-heart fa-lg text-red-500 ml-4 cursor-pointer"></i></button>} </div>

    </>)
}