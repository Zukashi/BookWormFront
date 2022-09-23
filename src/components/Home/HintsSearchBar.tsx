import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {AuthorState, authorUpdate} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
export const BooksSearchBar = () => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search);
  console.log(3)
  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {search.Result.slice(0,1).map(search => <Link to={`/author/${search.author_key}`} state={search.author_key}><div className='flex gap-4 w-32 cursor-pointer hover:text-amber-600'>
        {/*<h2 className='w-full text-left'>{search?.author_name[0]}</h2>*/}
        {<h3>{search.author_name}</h3>}

      </div></Link>)}
    </div>


  </>)
}