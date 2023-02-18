import React from 'react';
import {Button, Input} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const ManageContact = () => {
  const {user} = useSelector((state: RootState) => state.user);
  return (<>

    <div className='mx-auto w-[90%]'>
      <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Manage Contact</h1>
      <p className="mt-10 mb-3 w-[43vw]  mr-5">Dicord ID:</p>
      <Input ></Input>
      <p className="mt-4 mb-3 w-[43vw]  mr-5">Email:</p>
      <Input  value={user.email}></Input>
      <button className='p-4 bg-black text-2xl font-bold text-white rounded-md mx-auto  mt-6' type={"submit"} >
        Submit
      </button>
    </div>
  </>)
}