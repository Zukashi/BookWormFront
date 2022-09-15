import React from 'react';
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
export const BooksSearchBar = () => {
  const books = useSelector((state: RootState) => state.book.books);

  return (<>
    <div className='w-screen absolute top-[5vh] flex flex-col items-center'>
      {books.map(book => <div className='flex gap-4 w-32 '>
        <h2 className='w-full text-left'>{book.title}</h2>
        {<h3>{book.author}</h3>}

      </div>)}
    </div>


  </>)
}