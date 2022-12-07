import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";

export const OneBook = () => {
  const refImg = useRef<HTMLImageElement>(null);
  const mouseEntered = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    } else{
      refImg.current.classList.add('opacity-50')
    }
  }
  const mouseLeft = () => {
    if (refImg.current === null || refImg.current === undefined){
      return null;
    }
    refImg.current.classList.remove('opacity-50')
  }
  return (<> <div className='mt-4 bg-black w-[180px] inline-block'>
    <Link to='/works/OL27213498M' className='relative  w-[180px] '><Button pos='absolute' onMouseEnter={mouseEntered} className='top-[50%] left-[50%]    translate-y-[-50%] translate-x-[-50%] text-lime-600 z-10  hover:bg-amber-500 hover:text-black' h='31px' w='83px'>View Book</Button><img ref={refImg} src="https://covers.openlibrary.org/b/isbn/1471156265-M.jpg"  className="inline-block cursor-default " onMouseEnter={mouseEntered} onMouseOut={mouseLeft}  alt=""/>
    </Link>
  </div>
    <div className='inline-block ml-[-35px]'><p className='text-1xl font-bold w-40 leading-5'>It End With Us</p>
      <p className='text-sm mt-2'>COLLEN HOOVER</p></div></>)
}