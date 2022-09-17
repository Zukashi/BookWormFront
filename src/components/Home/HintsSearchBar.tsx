import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import {AuthorState} from "../../features/Author/authorSlice";
export const BooksSearchBar = () => {

  const author = useSelector((state: RootState) => state.author);




  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {author.docs.map(author => <div className='flex gap-4 w-32 '>

        <h2 className='w-full text-left'>{author?.top_work}</h2>
        {<h3>{author.name}</h3>}

      </div>)}
    </div>


  </>)
}