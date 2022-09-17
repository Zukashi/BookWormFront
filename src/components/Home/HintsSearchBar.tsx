import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import {AuthorState} from "../../features/Author/authorSlice";
export const BooksSearchBar = () => {

  const author = useSelector((state: RootState) => state.author);
  console.log(author);
  (async () => {
    const res = await fetch(`https://openlibrary.org/authors/${author.docs[0].key}/works.json?limit=3`);
    const data = await res.json();
    console.log(data)
  })()


  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {author.docs.slice(0,3).map(author => <div className='flex gap-4 w-32 '>

        <h2 className='w-full text-left'>{author?.top_work}</h2>
        {<h3>{author.name}</h3>}

      </div>)}
    </div>


  </>)
}