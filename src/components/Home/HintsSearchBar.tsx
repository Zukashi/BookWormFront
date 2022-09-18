import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {AuthorState, authorUpdate} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
export const BooksSearchBar = () => {
  const dispatch = useDispatch()
  const author = useSelector((state: RootState) => state.author);
  console.log(author);
  (async () => {
    const res = await fetch(`https://openlibrary.org/authors/${author.docs[0].key}/works.json?limit=3`);
    const data = await res.json();
    console.log(data)
  })()


  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {author.docs.slice(0,1).map(author => <Link to={`/author/${author.key}`}><div className='flex gap-4 w-32 cursor-pointer hover:text-amber-600'>
        <h2 className='w-full text-left'>{author?.type}</h2>
        {<h3>{author.name}</h3>}

      </div></Link>)}
    </div>


  </>)
}