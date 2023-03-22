import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {Button, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Select, Image} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link, useNavigate} from "react-router-dom";
import useWindowDimensions from './WindowDimensions';
import {DrawerComponentAdmin} from "./AdminHome/DrawerComponentAdmin";
import {AvatarComponent} from "./AdminHome/AvatarComponentForNav";


export const HomeNav = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [toggleSearchBarInSmMode, setToggleSearchBarInSmMode] = useState(false)
  const navigate = useNavigate();
  const mapOfCategoriesWithLinks:any = new Map([['Home', '/home'], ['Category', '/Category'], ['Books','/admin/books'], ['Users', '/admin/users'], ['Authors', '/authors']])
  const [categories, setCategories] = useState(['Home', 'Category', 'Books', 'Users', 'Authors']);
  const prevScroll = useRef(0);
  useEffect(() => {
    if(user.role === 'user') setCategories((prev) => prev.splice(0, 2))
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
      prevScroll.current = offset;
  }, [offset]);
 // const onChange = (value:string) => {
 //   (async() => {
 //     const encodedQuery = encodeURIComponent(value);
 //     const res = await fetch(`http://localhost:3001/search/${category}/${encodedQuery} `);
 //     const data = await res.json();
 //     dispatch(searchUpdate(data));
 //
 //   })();
 // };
 //  const onChangeCategory = (value:string) => {
 //    dispatch(categoryUpdate(value))
 //  }
  const onSubmit = (e:FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}`)
  }

  return (<>{prevScroll.current >= offset &&
    <nav className='w-screen  flex justify-center   h-16 fixed z-20  border-b-[rgb(221,221,221)] border-b-[1px] bg-[#fbfcff]'>
        <Link to='/home'><Image className='fixed top-2 left-5 z-30' alt='BookWorm app logo' boxSize='50px' src="https://cdn-icons-png.flaticon.com/512/2490/2490314.png"></Image></Link>
      {/*<Select w='100px' onChange={(e:any) => onChangeCategory(e.target.value)} bg='gray.500'>*/}
      {/*  <option value="q" selected disabled hidden style={{display:'none'}}  >Default</option>*/}
      {/*  <option value='title'>Title</option>*/}
      {/*  <option value='author'>Author</option>*/}
      {/*</Select>*/}
      {/*<div className='relative'>*/}
      {/*  <Input variant='filled' placeholder='Input your author or book' className='w-[200px]' onChange={(e:any) => onChange(e.target.value.trim())}/>*/}
      {/*  <i className="fa-solid fa-magnifying-glass top-[1.5vh] cursor-pointer hover:text-lime-400 absolute right-3"></i>*/}
      {/*</div>*/}


        <div className='hidden lg:flex justify-start w-full ml-32 gap-8   font-thin '>
          {categories.map((category:string) => <Link to={mapOfCategoriesWithLinks.get(category)}>
            <div className='hover:text-violet-600 cursor-pointer flex items-center h-full text-2xl'>{category}</div>
          </Link>)}
          <div className=' items-center w-full hidden h-full lg:flex'>
            <form className='flex relative' onSubmit={onSubmit}>
              <div className='absolute left-[4%] top-[17%] cursor-pointer' ><i className="fa-solid fa-magnifying-glass fa-sm" onClick={onSubmit}></i></div>
              <input type="text" placeholder='Search here ...' onChange={(e) => setSearchValue(e.target.value)} className='shadow-lg px-8 py-1.5 rounded-xl ring-1 w-80' />
            </form>

          </div>
        </div>
      <div className='hidden sm:flex items-center w-full  h-full flex justify-center lg:hidden ml-4'>
        <form className='flex relative' onSubmit={onSubmit}>
          <div className='absolute right-[4%] top-1/2 -translate-y-1/2 cursor-pointer' ><i className="fa-solid fa-magnifying-glass fa-lg px-2 py-1" onClick={onSubmit}></i></div>
          <input type="text" placeholder='Search here ...' onChange={(e) => setSearchValue(e.target.value)} className='shadow-lg px-4 pr-14 py-1.5 rounded-xl ring-1 w-80' />
        </form>

      </div>

      <div className={`absolute ${!toggleSearchBarInSmMode && '-translate-x-full '} top-16 transition-all w-full bg-[#dedede] py-2 sm:hidden -z-10`}>
        <div className='flex gap-2 justify-around'>
          <div className=' sm:flex items-center w-full h-full flex justify-start  ml-4'>
            <form className='flex relative w-full' onSubmit={onSubmit} autoComplete={'off'}>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer' ><i className="fa-solid fa-magnifying-glass fa-lg px-4 py-5" onClick={onSubmit}></i></div>
              <input type="text" placeholder='Search here ...' onChange={(e) => setSearchValue(e.target.value)} className='shadow-lg px-4 pr-14 py-1.5 rounded-xl ring-1 w-full' />
            </form>

          </div>
          <button className='font-medium px-2 py-1 mr-4 ' onClick={() => setToggleSearchBarInSmMode(false)}><p className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-black'>Cancel</p></button>
        </div>
      </div>
     <div className={`absolute  ${user.role === 'admin' ? 'left-36' : 'left-20'} top-1/2 -translate-y-1/2 cursor-pointer`} onClick={() => setToggleSearchBarInSmMode((prev) => !prev)}>
       <div className='sm:hidden flex items-center justify-end'>
         <i className="fa-solid fa-magnifying-glass fa-2xl px-4 py-5"></i>
       </div>
     </div>

      <div className='absolute right-10' >


            {user.role === 'user' ? <AvatarComponent></AvatarComponent> : <DrawerComponentAdmin/>}



      </div>
    </nav>}
  </>)
}