import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";

export interface AuthorInterface {
  alternate_names : string[],
  birth_date:string,
  personal_name:string,
  name:string,
  key:string,
  bio:string,
  links : [{
    url:string,
    title:string,
  }]
}
export const OneAuthor = () => {
  const location: any = useLocation();
  const {state} = location;
  const [data, setData] = useState<null |AuthorInterface>()
  const params = useParams();
  console.log(params)
  useEffect( () => {
    (async () => {
      const res = await fetch(`http://localhost:3001/author/${state[0]}`)
      const data = await res.json();
      setData(data);
    })()
  },[])
  console.log(data)
  let encryptedLinks = data?.links.filter((link, index) => {
    if (link.url.includes('https')){
      return link
    };
  });

  return (<>
      <section className='w-[80vw] bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto'>
        <div className='flex justify-center pt-[5vh]'>
          <h1 className='text-[5vw] text-center'></h1>
          <img src={`https://covers.openlibrary.org/a/olid/${params.authorId}-M.jpg`} alt=""/>

        </div>
        <p className='text-center'>{data?.name}</p>
        <div className='pl-[5vh]'>
          <p>Birth date: {data?.birth_date}</p>
          <p>Links: {encryptedLinks?.map((link) => {
            return  <a href={`${link.url}`} className='text-white hover:text-amber-400'> {link.title}</a>
          })}</p>
        </div>
      </section>

  </>)
}