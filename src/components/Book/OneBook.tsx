import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {AuthorDocs} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {BooksSearchBar} from "../Home/HintsSearchBar";
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
  const [author ,setAuthor] = useState<null | AuthorDocs>(null)
  const location = useLocation();
  useEffect(() => {
    (async() => {
        const response = await fetch(`http://localhost:3001/author/${location.state}`)
        const data = await response.json();
        setAuthor(data)
    })()
  },[])
  const params = useParams();
  console.log(params)
  useEffect( () => {
    (async () => {
      const res = await fetch(`http://localhost:3001/works/${params.bookId}`)
      const data = await res.json();
      setData(data);
    })()
  },[]);




  return (<>
    <section className='w-screen bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto '>
      <HomeNav/>
      <BooksSearchBar/>
      <img src={`https://covers.openlibrary.org/b/id/${data?.covers[0]}-L.jpg`} alt=""/>
      <h1 className='text-4xl'>{data?.title} by <Link to={`/author/${location.state}`} state={[author?.key]}><p className='hover:text-cyan-400 cursor-pointer'>{author?.personal_name}</p></Link></h1>
    </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author