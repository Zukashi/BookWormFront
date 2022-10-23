import {Button} from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";

export const MainBooks = () => {
  return (<>
    <main className='w-[90vw]  m-auto mt-5' >
    <div className='w-full border-black border-b-2 pb-3 relative'>
      <h1 className='text-3xl inline-block'>Browse Books</h1>
      <div className='absolute right-0 inline-block'>
        <Button >View More</Button>
      </div>
    </div>
      <div className='mt-4 '>
        <Link to='/works/OL27351482M' className='relative'><Button pos='absolute' className='top-0'>View Book</Button><img src="https://covers.openlibrary.org/b/isbn/0062899147-M.jpg"  className="inline-block cursor-default" alt=""/ >

        </Link>
        <div className='inline-block ml-4'><p className='text-1xl font-bold w-40 leading-5'>The Subtle Art of Not Giving a F*ck</p>
          <p className='text-sm mt-2'>Mark Manson</p></div>
      </div>
    </main>
  </>)
}