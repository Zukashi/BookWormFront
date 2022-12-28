import React, {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import {useParams} from "react-router";

export const ChangePassword = () => {
  const params = useParams();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword:'',
    newPassword:'',
    verifyPassword:'',
    id:params.userId,
  });

  const onSend = (e:any) => {
    e.preventDefault();
    (async() => {
      const res = await fetch('http://localhost:3001/user/password',{
        method:'PUT',
        credentials:'include',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(passwordForm)
      });
      const data = await res.json();
    })()

  }
  const onChange = (value:string,fieldName:string) => {
    setPasswordForm(prev => ({
      ...prev,
      [fieldName]:value
    }))
  }

  return (<>
      <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Change Password</h1>
    <form onSubmit={onSend}>
      <p className="mt-10 mb-3 w-[43vw]  mr-5">Current Password:</p>
      <Input type='password' onChange={(e:any) => onChange(e.target.value, "currentPassword")}></Input>
      <p className="mt-4 mb-3 w-[43vw]  mr-5">New Password:</p>
      <Input type='password' onChange={(e:any) => onChange(e.target.value, "newPassword")}></Input>
      <p className="mt-4 mb-3 w-[43vw]  mr-5">Verify Password:</p>
      <Input type='password' onChange={(e:any) => onChange(e.target.value, "verifyPassword")}></Input>
      <Button type={"submit"} mt={"30px"} variant='solid' backgroundColor={'#6366f1'} _active={{
        backgroundColor: '#6366f1',
        color:'#fff',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }} _hover={{backgroundColor:'#6366f1', color:'#fff'}}>
        Submit
      </Button>
    </form></>)
}