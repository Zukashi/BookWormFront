import React, {FormEvent, useEffect, useState} from 'react';
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
export const EditAccount = () => {
  const {userId} = useParams();
  const [form, setForm] = useState();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(form)
      })
    })()


  const onSend =(e:FormEvent)=>{
    e.preventDefault()
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
      <Tabs isFitted variant='enclosed'  pt={20} w={"full"} >
        <TabList mb='1em'>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}} h='75px'>Personal Information</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff' }}>Change Password</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Email And SMS</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Manage Contact</Tab>
        </TabList>
        <TabPanels >
          <TabPanel p={0}>
            <h1 className='font-bold text-2xl border-2 border-b-[#f1f1f1]'>Personal Information</h1>
            <p>pic...</p>
            <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">First Name:</p>
            <p className="mt-10 mb-3 inline-block">Last Name:</p>
            <Input w='43vw'  onChange={(e:any) => dispatch(userNameUpdate(e.target.value)) } className='inline-block mr-5' placeholder='John'></Input>
            <Input className='inline-block ' w='43vw' placeholder='Smith'></Input>

            <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">User Name:</p>
            <p className="mt-10 mb-3 inline-block">City:</p>
            <Input w='43vw' value={user.username} onChange={(e:any) => dispatch(userNameUpdate(e.target.value)) } className='inline-block mr-5'></Input>
            <Input className='inline-block ' w='43vw' placeholder='Atlanta'></Input>

            <p className="mt-10 mb-3 w-[43vw] inline-block mr-5">Date Of Birth:</p>
            <p className="mt-10 mb-3 inline-block">Country:</p>
       <Input  w='43vw' className='inline-block mr-5'
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
            <Input className='inline-block ' w='43vw' placeholder='USA'></Input>
          <Button type={"submit"} mt={"30px"} variant='solid' backgroundColor={'#6366f1'} _active={{
            backgroundColor: '#6366f1',
            color:'#fff',
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
          }} _hover={{backgroundColor:'#6366f1', color:'#fff'}}>
            Submit
          </Button>
          </TabPanel>
          <TabPanel p={0}>
            <p>two!</p>
          </TabPanel>
          <TabPanel p={0}>
            <p>two!</p>
          </TabPanel>
          <TabPanel p={0}>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>



  </>)
}