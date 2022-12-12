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

  const {category} = useSelector((state: RootState) => state.category);
  const user = useSelector((state: RootState) => state.user);
  const { height, width } = useWindowDimensions();
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
      <div className='absolute right-0'>
        { width > 900 ?
          <Button>
        Profile
          </Button>:
          <button  className='w-10 h-10'><i className="fa-solid fa-bars-staggered fa-lg text-teal-600"></i></button>}
      <div>
        <div className='flex flex-col absolute z-10 bg-white right-1 w-[150px] items-center   border-black border-[1px]'>
          <div className='w-full border-b-gray-200 border-t-[1px] flex items-center w-full h-14'><Link to={`/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600'><i className="fa-solid fa-user pt-1.5 absolute left-2"></i>My Account</Link></div>
          <div className='w-full border-b-gray-200 border-t-[1px] flex h-14 w-full items-center '><Link to={`/edit/user/${user._id}`}className='w-full flex justify-center hover:text-violet-600'><i
              className="fa-solid fa-pen-to-square pt-[4px] absolute left-2"></i>Edit account</Link></div>
          <div className='w-full border-b-gray-200 border-t-[1px] flex h-14 w-full items-center'><Link to={`/favorites/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600 '><i className="fa-solid fa-star pt-[4px] absolute left-2 "></i><p className='w-[86px] text-left'>Favorites</p></Link></div>
        </div>
      </div>

      </div>
    </nav>
  </>)
}