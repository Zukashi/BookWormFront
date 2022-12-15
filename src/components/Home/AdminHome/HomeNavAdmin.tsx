import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import useWindowDimensions from "../WindowDimensions";
import {Link} from "react-router-dom";
import {Button, Image} from "@chakra-ui/react";
import {DrawerComponent} from "../DrawerMobile";
import { DrawerComponentAdmin } from './DrawerComponentAdmin';

export const HomeNavAdmin = () => {
    const dispatch = useDispatch();
    const [burger, setBurger] = useState(false)
    const {category} = useSelector((state: RootState) => state.category);
    const { height, width } = useWindowDimensions();
    const [offset, setOffset] = useState(0);
    const prevScroll = useRef(0);
    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
        prevScroll.current = offset
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

    return (<>{prevScroll.current >= offset &&
        <nav className='w-screen  flex justify-center pt-2  h-16 fixed z-40  border-b-[rgb(221,221,221)] border-b-[1px] bg-white'>
            <Link to='/home'><Image className='fixed top-2 left-16 z-30' boxSize='50px' src="https://cdn-icons-png.flaticon.com/512/2490/2490314.png"></Image></Link>
            {/*<Select w='100px' onChange={(e:any) => onChangeCategory(e.target.value)} bg='gray.500'>*/}
            {/*  <option value="q" selected disabled hidden style={{display:'none'}}  >Default</option>*/}
            {/*  <option value='title'>Title</option>*/}
            {/*  <option value='author'>Author</option>*/}
            {/*</Select>*/}
            {/*<div className='relative'>*/}
            {/*  <Input variant='filled' placeholder='Input your author or book' className='w-[200px]' onChange={(e:any) => onChange(e.target.value.trim())}/>*/}
            {/*  <i className="fa-solid fa-magnifying-glass top-[1.5vh] cursor-pointer hover:text-lime-400 absolute right-3"></i>*/}
            {/*</div>*/}
            <div className='absolute right-10' >
                { width > 900 ?
                    <Button onClick={() => setBurger((value:boolean)=> !value)}>
                        Profile
                    </Button>:

                    <div><DrawerComponent></DrawerComponent>
                        <DrawerComponentAdmin/></div>}

            </div>
        </nav>}
        </>)
}