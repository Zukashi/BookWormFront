import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {
  Avatar as AvatarChakra,
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";

import {ChangePassword} from "./ChangePassword";
import {EmailAndSMS} from "./EmailAndSMS";
import { ManageContact } from './ManageContact';
import {HomeNav} from "../Home/HomeNav";
import Avatar from 'react-avatar-edit';
import {SubmitHandler, useForm} from "react-hook-form";
export interface UserInterface {
  city:string,
  country:string,
  dateOfBirth:string | Date,
  firstName:string,
  lastName:string,
  username:string,
  _id:string,
}

export const EditAccount = () => {
  const {userId} = useParams();

  const {user} = useSelector((state: RootState) => state.user);
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [src, setSrc] = useState(undefined);
  const [preview ,setPreview] = useState(null);
  const onClose = () => {
    setPreview(null)
  }
  const onCrop = (view:any) => setPreview(view)
  const [form, setForm] = useState({
    username :'',
    firstName:'',
    lastName:'',
    city:'',
    country:'',
    dateOfBirth:'',
    _id: '',
    base64Avatar:''
  });
  const {register, handleSubmit}  = useForm<UserInterface>({
    values:form});
  console.log(getFormattedDate(new Date(Date.now())))
  function getFormattedDate(date:Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  };
  const saveAvatar = async () => {
      await fetch(`http://localhost:3001/user/${user._id}/avatar`,{
        method:'PUT',
        credentials:'include',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({preview})
      })
      setPreview(null);
      setToggleAvatar(prev => !prev)
  }
  useEffect(() => {
    (async() =>{
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        credentials:'include',
      })
      const data = await res.json();
      setForm(data);
    })();
  },[]);
  const onSend = (data:any) => {

    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        credentials:'include',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(data)
      })
      window.location.reload();
    })();

  };
  const onChange = (value:string, fieldName:string) => {
    setForm(prev => ({
        ...prev,
        [fieldName]:value,
    }))
  };
  return (<>
    <HomeNav/>
    <div className='w-[90vw] flex m-auto'>
      <Tabs isFitted variant='enclosed'  pt={20} w={"full"} border='0px' >
        <TabList mb='1em'>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}} h='75px'>Personal Information</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff' }}>Change Password</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Email And SMS</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Manage Contact</Tab>
        </TabList>
        <TabPanels >
          <TabPanel p={0}>

            <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Personal Information</h1>
            <AvatarChakra size='xl' src={form.base64Avatar}/>
            <button className='outline-none bg-amber-300 px-4 py-2 border-2 border-black ml-20 mt-7 ' onClick={() => setToggleAvatar(prev => !prev)}>Change Avatar</button>

            {toggleAvatar &&  <div className='flex w-full h-[200px]'>   <div className='relative w-[210px]'>
              {toggleAvatar && <Avatar width={150} height={150} src={src} onClose={onClose} onCrop={onCrop} />}
              {preview && <button className='font-bold bg-black text-white text-xl rounded-xl border-[2px] px-5 py-2.5 absolute bottom-12 -right-2 'onClick={saveAvatar}>
                <i className="fa-solid fa-check"></i></button>}
            </div>
              {preview && <div className='w-full h-full flex justify-center items-start ml-20 '><div className='ml-3 font-bold text-xl '>Preview:<img className='' src={preview} alt=""/></div></div>}</div>}
            <form onSubmit={handleSubmit(onSend)}>
            <div className='grid grid-cols-2'>  <div><div className='h-[70px] relative mt-5'><p className=" mb-3 inline-block mr-5">First Name:</p>
              <Input w='42vw'   {...register('firstName')} pos='absolute' left='0' bottom='0' placeholder='John' ></Input></div>

              <div className='h-[70px] relative mt-7'> <p className=" mb-3  inline-block mr-5">Last Name:</p>
                <Input className='inline-block'  w='42vw' pos='absolute' left='0' bottom='0'  placeholder='Smith'  {...register('lastName')} ></Input></div>

              <div className='h-[70px] relative mt-7 '><p className=" mb-3  inline-block mr-5">User Name:</p>
                <Input w='42vw'  pos='absolute' left='0' bottom='0' {...register('username')} ></Input></div></div>




             <div> <div className='h-[70px] relative mt-5'> <p className=" mb-3 inline-block ">City:</p>
               <Input className='inline-block'  w='42vw' pos='absolute' left='0' bottom='0'  placeholder='Atlanta' {...register('city')} ></Input></div>



               <div className='h-[70px] relative mt-7'> <p className=" mb-3 w-[42vw] inline-block mr-5">Date Of Birth:</p> <Input  w='42vw' className='inline-block mr-5' pos='absolute' left='0' bottom='0'  {...register('dateOfBirth')}

                                                           type='date'
                                                           max={new Date().toISOString().slice(0, -14)}
                                                           size="md"

               /></div>
               <div className='h-[70px] relative mt-7'><p className=" mb-3 inline-block mr-20">Country:</p>
                 <Input className='inline-block ' pos='absolute' left='0' bottom='0' w='42vw' placeholder='USA' {...register('country')}></Input></div></div></div>
              <div className='w-full flex justify-center mt-5'
              ><input className='p-4 bg-black text-2xl font-bold text-white rounded-md mx-auto  ' type={"submit"} >

              </input></div>
            </form>
          </TabPanel>
          <TabPanel p={0}>
            <ChangePassword/>
          </TabPanel>
          <TabPanel p={0}>
            <EmailAndSMS/>
          </TabPanel>
          <TabPanel p={0}>
            <ManageContact/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>



  </>)
}


///@TODO extract Avatar associated things to separate component for better readability