import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {authorUpdate} from "../../features/Author/authorSlice";


export const OneAuthor = () => {
  const author = useSelector((state: RootState) => state.author);
  const dispatch = useDispatch();
  const currentAuthor = author.docs[0];
  return (<>

      <section className='w-[80vw] bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto'>
        <h1 className='text-[5vw] text-center'>{currentAuthor.name}</h1>


      </section>

  </>)
}