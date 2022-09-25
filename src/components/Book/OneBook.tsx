import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";

export interface Book {
  type: {
    key:string,
  },
  title:string,
  covers:number[],
  key:string,
  created:{
    type:string,
    value:string,
  },
  last_modified:{
    type:string,
    value:string,
  },
  authors: {
  type:{key:string},
  author:{key:string}
  }[]
}

export const OneBook = () => {
  const [data ,setData] = useState<null | Book>(null);
  const location = useLocation();
  console.log(location)
  const params = useParams();
  console.log(params)
  useEffect( () => {
    (async () => {
      const res = await fetch(`http://localhost:3001/works/${params.bookId}`)
      const data = await res.json();
      setData(data);
    })()
  },[]);
  console.log( location.state)




  return (<>
    <section className='w-[80vw] bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto '>
      <img src={`https://covers.openlibrary.org/b/id/${data?.covers[0]}-L.jpg`} alt=""/>
      <h1 className='text-4xl'>{data?.title} by </h1>
    </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author