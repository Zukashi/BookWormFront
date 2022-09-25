import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import { useSelector} from "react-redux";
import {AuthorState, authorUpdate} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
export const BooksSearchBar = () => {
  const search = useSelector((state: RootState) => state.search);
  const {category} = useSelector((state: RootState) => state.category);
  console.log(search)
  console.log(category)
  return (<>
    { category === 'author' ? <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {search.Result.slice(0,1).map(search => <Link to={`/author/${search.author_key}`} state={search.author_key}><div className='flex gap-4 w-32 cursor-pointer hover:text-amber-600'>
        {/*<h2 className='w-full text-left'>{search?.author_name[0]}</h2>*/}
        {<h3>{search.author_name}</h3>}

      </div></Link>)}
    </div> :  <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {search.Result.slice(0,4).map(search => <div className='flex gap-4 w-32 cursor-pointer '><Link to={`${search.key}`} state={search.key}>
        <h2 className='w-full text-left hover:text-amber-600'>{search?.title}</h2></Link>
        <Link to={`/author/${search.author_key}`} state={search.author_key}> {<h3 className=' hover:text-cyan-400'>{search.author_name}</h3>}
        </Link>
      </div>)}
    </div> }


  </>)
}