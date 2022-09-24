import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";

export interface AuthorInterface {
  alternate_names : string[],
  birth_date:string,
  death_date?:string,
  personal_name:string,
  name:string,
  key:string,
  bio?: {
    value:string,
    type:string,
  } | string,
  links?: [{
    url:string,
    title:string,
  }],
  created?:{
    type:string,
    value:string,
  }
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
  },[]);
  const date = new Date('2008-04-01T03:28:50.625462');
  let encryptedLinks;
  if (data?.links){
    encryptedLinks = data?.links.filter((link, index) => {
      if (link.url.includes('https')){
        return link
      };
    });
  };


  return (<>
      <section className='w-[80vw] bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto'>
        <div className='flex justify-center pt-[5vh]'>
          <h1 className='text-[5vw] text-center'></h1>
          <img src={`https://covers.openlibrary.org/a/olid/${params.authorId}-M.jpg`} alt=""/>

        </div>
        <p className='text-center'>{data?.personal_name}</p>
        <div className='pl-[5vh] mt-[1vw]'>
          <p>Birth date: {data?.birth_date}</p>
          <p>Death date: {data?.death_date}</p>
          {data?.links && <p>Links: {encryptedLinks?.map((link) => {
            return  <a href={`${link.url}`} className='text-white hover:text-amber-400'> {link.title}</a>
          })}</p>}
          <p>Bio: {data?.bio instanceof Object ? data?.bio.value : data?.bio}</p>
          <p className='absolute bottom-4'>Created at: {date.toLocaleString()}</p>
        </div>
      </section>

  </>)
}
// @TODO get books of author and add cover of books also add BOOK cover and author photo when searching with top work of author