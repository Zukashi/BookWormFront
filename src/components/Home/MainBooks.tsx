import {Button} from "@chakra-ui/react";
import React, {useRef} from "react";
import {Link} from "react-router-dom";
import {OneBook} from "./OneBook";

export const MainBooks = () => {

  return (<>
    <main className='w-[90vw]  m-auto pt-20' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div>
    <div className='flex-col gap-0 justify-between items-center'>
      <OneBook/>
      <OneBook/>
      <OneBook/>
      <OneBook/></div>

    </main>
  </>)
}