import React, {useEffect, useState} from 'react';
import {Button, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Select} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {searchUpdate} from "../../features/Search/searchSlice";
import {categoryUpdate} from "../../features/Search/categorySlice";
import {RootState} from "../../app/store";
import {Link} from "react-router-dom";
import useWindowDimensions from './WindowDimensions';
import { DrawerComponent } from './DrawerMobile';


export const HomeNav = () => {
  const dispatch = useDispatch();
  const [burger, setBurger] = useState(false)
  const {category} = useSelector((state: RootState) => state.category);
  const { height, width } = useWindowDimensions();
 const onChange = (value:string) => {
   (async() => {
     const encodedQuery = encodeURIComponent(value);
     const res = await fetch(`http://localhost:3001/search/${category}/${encodedQuery} `);
     const data = await res.json();
     dispatch(searchUpdate(data));

   })();
 };
  const onChangeCategory = (value:string) => {
    dispatch(categoryUpdate(value))
  }

  return (<>
    <nav className='w-100vw  flex justify-center'>
      <Select w='100px' onChange={(e:any) => onChangeCategory(e.target.value)} bg='gray.500'>
        <option value="q" selected disabled hidden style={{display:'none'}}  >Default</option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
      </Select>
      <div className='relative'>
        <Input variant='filled' placeholder='Input your author or book' className='w-[200px]' onChange={(e:any) => onChange(e.target.value.trim())}/>
        <i className="fa-solid fa-magnifying-glass top-[1.5vh] cursor-pointer hover:text-lime-400 absolute right-3"></i>
      </div>
      <div className='absolute right-10'>
        { width > 900 ?
          <Button onClick={() => setBurger((value:boolean)=> !value)}>
        Profile
          </Button>:

      <DrawerComponent></DrawerComponent>}

      </div>
    </nav>
  </>)
}