import React from 'react';
import {Button, Input} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const ManageContact = () => {
  const {user} = useSelector((state: RootState) => state.user);
  return (<>

    <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Manage Contact</h1>
    <p className="mt-10 mb-3 w-[43vw]  mr-5">Dicord ID:</p>
    <Input ></Input>
    <p className="mt-4 mb-3 w-[43vw]  mr-5">Email:</p>
    <Input  value={user.email}></Input>
    <Button type={"submit"} mt={"30px"} variant='solid' backgroundColor={'#6366f1'} _active={{
      backgroundColor: '#6366f1',
      color:'#fff',
      transform: 'scale(0.98)',
      borderColor: '#bec3c9',
    }} _hover={{backgroundColor:'#6366f1', color:'#fff'}}>
      Submit
    </Button>
  </>)
}