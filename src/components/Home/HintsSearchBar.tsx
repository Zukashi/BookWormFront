import React, {useEffect} from 'react';
import {RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {AuthorState, authorUpdate} from "../../features/Author/authorSlice";
import {Link} from "react-router-dom";
import {searchUpdate} from "../../features/Search/searchSlice";
export const BooksSearchBar = () => {
  const search = useSelector((state: RootState) => state.search);
  const {category} = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(searchUpdate([{key:'',title:'',language:[],author_name:'',author_key:[],cover_edition_key:'',cover_i:0,isbn:[]}]))
  },[]);
  if (search.Result[0]?.key === ''){
    return null;
  }
  return (<>
    { category === 'author' ? <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {search.Result.slice(0,1).map(search => <Link to={`/author/${search.author_key}`} ><div className='flex gap-4 w-32 cursor-pointer hover:text-lime-400 '>
        <img src={`https://covers.openlibrary.org/a/olid/${search.author_key}-M.jpg`} alt=""/>
        {<h3 className='hover:text-lime-400'>{search.author_name}</h3>}

      </div></Link>)}
    </div> :  <div className='w-screen absolute top-[5vh] flex flex-col items-center'>

      {search.Result.slice(0,4).map(search => search.cover_i &&
        <div className='flex gap-4 w-60 cursor-pointer mb-[15vh] relative  '><Link to={`${search.key}`}  className='h-20' >
        <img src={`https://covers.openlibrary.org/b/id/${search.cover_i}-M.jpg`} width='120px' alt=""/>
        <h2 className='w-full text-left hover:text-amber-600 absolute  -bottom-14 w-1/2 right-6 w-20'>{search?.title}</h2></Link>
        <Link to={`/author/${search.author_key}`} > {<h3 className='hover:text-lime-400 w-20'>{search.author_name}</h3>}
        </Link>
      </div>)}
    </div> }


  </>)
}