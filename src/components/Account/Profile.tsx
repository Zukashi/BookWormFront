import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";


export const Profile = () => {
  const user = useSelector((state:RootState) => state.user)
  return (<>

    <section className='bg-gradient-to-r from-sky-800 to-indigo-900 w-screen h-screen bg-[#fbfcff] '>
    <div>
      <div className='flex flex-col gap-5 pt-[5vw] text-center w-[20vw] bg-white absolute top-20 left-20'>
        <h2>picture</h2>
        <h1>{user.username}</h1>
        <h3>job</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, iusto!</p>
      </div>
      <div className="flex flex-col gap-5 pt-[5vw] text-center w-[20vw] bg-white  absolute bottom-40 left-20">
        <p>birthday : #date</p>
        <p>address : #city</p>
        <p>phone : #number</p>
        <p>email : #email</p>
      </div>
    </div>

    </section>

  </>)
}