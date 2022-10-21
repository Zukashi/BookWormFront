import {Button} from "@chakra-ui/react";
import React from "react";

export const MainBooks = () => {
  return (<>
    <main className='w-[90vw]  m-auto mt-5' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div></main>
  </>)
}