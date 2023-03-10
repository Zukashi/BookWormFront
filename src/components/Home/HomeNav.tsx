import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Select, Image} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link} from "react-router-dom";
import useWindowDimensions from './WindowDimensions';
import {DrawerComponentAdmin} from "./AdminHome/DrawerComponentAdmin";
import {AvatarComponent} from "./AdminHome/AvatarComponentForNav";


export const HomeNav = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState(0);
  const mapOfCategoriesWithLinks:any = new Map([['Home', '/home'], ['Category', '/Category'], ['Books','/admin/books'], ['Users', '/admin/users'], ['Authors', '/authors']])
  const [categories, setCategories] = useState<string[]>(['Home', 'Category', 'Books', 'Users', 'Authors']);
  const prevScroll = useRef(0);
  console.log(categories)
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
  console.log(mapOfCategoriesWithLinks.get('Home'))
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
  // @ts-ignore
  return (<>{prevScroll.current >= offset &&
    <nav className='w-screen  flex justify-center   h-16 fixed z-10  border-b-[rgb(221,221,221)] border-b-[1px] bg-[#fbfcff]'>
        <Link to='/home'><Image className='fixed top-2 left-5 z-30' boxSize='50px' src="https://cdn-icons-png.flaticon.com/512/2490/2490314.png"></Image></Link>
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
            <div className='flex relative'>
              <div className='absolute left-[4%] top-[17%] cursor-pointer' ><i className="fa-solid fa-magnifying-glass fa-sm"></i></div>
              <input type="text" placeholder='Search here ...' className='shadow-lg px-8 py-1.5 rounded-xl ring-1 w-80' />
            </div>

          </div>
        </div>


      <div className='absolute right-10' >


            {user.role === 'user' ? <AvatarComponent></AvatarComponent> : <DrawerComponentAdmin/>}



      </div>
    </nav>}
  </>)
}