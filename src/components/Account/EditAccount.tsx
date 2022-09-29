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
  const dispatch = useDispatch()
  console.log(userId)
  useEffect(() => {
    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(form)
      })
    })()
  },[])

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
    <Tabs isFitted variant='enclosed' pt={20}>
      <TabList mb='1em'>
        <Tab _selected={{backgroundColor:'#3730a3'}}>Personal Information</Tab>
        <Tab _selected={{backgroundColor:'#6366f1'}}>Change Password</Tab>
        <Tab _selected={{backgroundColor:'#6366f1'}}>Email And SMS</Tab>
        <Tab _selected={{backgroundColor:'#6366f1'}}>Manage Contact</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <Input w='300px' value={user.username} onChange={(e:any) => dispatch(userNameUpdate(e.target.value)) }></Input>


  </>)
}