import React, {useEffect, useState} from 'react';
import {Button, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Select} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {searchUpdate} from "../../features/Search/searchSlice";
import {categoryUpdate} from "../../features/Search/categorySlice";
import {RootState} from "../../app/store";


export const HomeNav = () => {
  const dispatch = useDispatch();
  const {category} = useSelector((state: RootState) => state.category);
 const onChange = (value:string) => {
   (async() => {
     const encodedQuery = encodeURIComponent(value);
     const res = await fetch(`http://localhost:3001/search/${category}/${encodedQuery} `);
     const data = await res.json();
     dispatch(searchUpdate(data));

     console.log(2)
   })();
 };
  const onChangeCategory = (value:string) => {
    dispatch(categoryUpdate(value))
    console.log(category)
  }

  return (<>
    <nav className='w-100vw h-[200px] flex justify-center'>
      <Select w='160px' onChange={(e:any) => onChangeCategory(e.target.value)} bg='gray.500'>
        <option value="q" selected disabled hidden style={{display:'none'}}  >Default</option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
      </Select>
      <div className='relative'>
        <Input  variant='filled' placeholder='Input your author or book' width='400px' onChange={(e:any) => onChange(e.target.value.trim())}/>
        <i className="fa-solid fa-magnifying-glass top-[1.5vh] cursor-pointer hover:text-lime-400 absolute right-3"></i>
      </div>
      <div className='absolute right-0'>
      <Menu>
      <MenuButton  as={Button} colorScheme='blue' >
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title='Profile' >
          <MenuItem>My Account</MenuItem>
          <MenuItem>Favorites</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>

      </div>

    </nav>

  </>)
}