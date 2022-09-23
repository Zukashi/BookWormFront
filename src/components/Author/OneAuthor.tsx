import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {authorUpdate} from "../../features/Author/authorSlice";
import {useLocation} from "react-router";

export const OneAuthor = () => {
  const author = useSelector((state: RootState) => state.author);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const {state} = location;

  useEffect( () => {
    (async () => {
      await fetch(`http:localhost:3001/author/${state[0]}`)
    })()
  },[])


  const currentAuthor = author.docs[0];
  return (<>

      <section className='w-[80vw] bg-gradient-to-r from-sky-500 to-indigo-800 h-[100vh] m-auto'>
        <h1 className='text-[5vw] text-center'>{currentAuthor.name}</h1>


      </section>

  </>)
}