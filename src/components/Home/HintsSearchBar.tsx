import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {AuthorState, authorUpdate} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
export const BooksSearchBar = () => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search);
  console.log(search);
  console.log(123)
  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {/*{search.docs.slice(0,1).map(search => <Link to={`/author/${search.key}`}><div className='flex gap-4 w-32 cursor-pointer hover:text-amber-600'>*/}
      {/*  <h2 className='w-full text-left'>{search?.type}</h2>*/}
      {/*  {<h3>{search.birth_date}</h3>}*/}

      {/*</div></Link>)}*/}
    </div>


  </>)
}