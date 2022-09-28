import React, {FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Input} from "@chakra-ui/react";
import {userNameUpdate, userUpdate} from "../../features/User/userSlice";
export const EditAccount = () => {
  const {userId} = useParams();
  // const {userData , setUserData} = useState();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  console.log(userId)
  useEffect(() => {
    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        headers:{
          'Content-type':'application/json'
        },
        // body:JSON.stringify(userData)
      })
    })()
  },[])

  const onSend =(e:FormEvent)=>{
    e.preventDefault()
  }
  return (<>

    <Input value={user.username} onChange={(e:any) => dispatch(userNameUpdate(e.target.value)) }></Input>


  </>)
}