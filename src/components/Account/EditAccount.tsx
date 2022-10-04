import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {
  Button,
  Input, Menu,
  MenuButton, MenuDivider,
  MenuGroup, MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import {userNameUpdate, userUpdate} from "../../features/User/userSlice";
import {Link} from "react-router-dom";
import {ChangePassword} from "./ChangePassword";
import {EmailAndSMS} from "./EmailAndSMS";
import { ManageContact } from './ManageContact';
export const EditAccount = () => {
  const {userId} = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState({
      username :user.username,
      firstName:'',
      lastName:'',
      city:'',
      country:'',
      dateOfBirth:'',
      id: userId,
  });


  const onSend = (e:any) => {
    e.preventDefault();

    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(form)
      })
    })()
  }

  const onChange = (value:string, fieldName:string) => {
    setForm(prev => ({
        ...prev,
        [fieldName]:value,
    }))
  }
  return (<>
    <Menu>
      <MenuButton   as={Button} colorScheme='blue' pos='absolute' right={0}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title='Profile' >
          <Link to={`/user/${user._id}`}><MenuItem>My Account</MenuItem></Link>
          <Link to={`/edit/user/${user._id}`}><MenuItem>Edit account</MenuItem></Link>
          <Link to={`/favorites/user/${user._id}`}><MenuItem>Favorites</MenuItem></Link>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
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
            <p>pic...</p>
            <form onSubmit={onSend}>
              <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">First Name:</p>
              <p className="mt-10 mb-3 inline-block">Last Name:</p>
              <Input w='43vw' value={form.firstName}  onChange={ (e:any) => onChange(e.target.value, 'firstName') } className='inline-block mr-5' placeholder='John' name='firstName'></Input>
              <Input className='inline-block ' w='43vw' placeholder='Smith' name="lastName" onChange={ (e:any) => onChange(e.target.value, 'lastName') } ></Input>

              <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">User Name:</p>
              <p className="mt-10 mb-3 inline-block">City:</p>
              <Input w='43vw' value={form.username}  className='inline-block mr-5' name='username' onChange={ (e:any) => onChange(e.target.value, 'username') } ></Input>
              <Input className='inline-block ' w='43vw' placeholder='Atlanta' name='city' onChange={ (e:any) => onChange(e.target.value, 'city') } ></Input>

              <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">Date Of Birth:</p>
              <p className="mt-10 mb-3 inline-block">Country:</p>
              <Input  w='43vw' className='inline-block mr-5'
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      name='dateOfBirth'
                      onChange={ (e:any) => onChange(e.target.value, 'dateOfBirth') }
              />
              <Input className='inline-block ' w='43vw' placeholder='USA' name='country' onChange={ (e:any) => onChange(e.target.value, 'country') } ></Input>
              <Button type={"submit"} mt={"30px"} variant='solid' backgroundColor={'#6366f1'} _active={{
                backgroundColor: '#6366f1',
                color:'#fff',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
              }} _hover={{backgroundColor:'#6366f1', color:'#fff'}}>
                Submit
              </Button>
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