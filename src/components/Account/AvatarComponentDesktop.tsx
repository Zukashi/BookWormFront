import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "../../app/store";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {apiUrl} from "../../config/api";

export const AvatarComponentDesktop = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const axiosPrivate = useAxiosPrivate();
    const btnRef :any = React.useRef();
    const navigate = useNavigate()
    const [preview, setPreview] = useState('');
    const logOut = async () => {
        await axiosPrivate.delete(`${apiUrl}/user/${user._id}/logout`);
        navigate('/')
    }
    useEffect(() => {
        ( async () => {
            const res = await axiosPrivate.get(`${apiUrl}/user/${user._id}`)
            setPreview(res.data.base64Avatar)
        })()
    }, [])
    return (<>

        <button ref={btnRef} onClick={onOpen} className='w-14 h-14 fixed z-20 mt-1 right-0.5 top-0.5'><img src={preview} alt=""/></button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            size='xs'
        >
            <DrawerOverlay />
            <DrawerContent className='relative'>
                <div className='h-10 bg-gray pb-[60px] border-b-[rgb(221,221,221)] border-[1px]'><DrawerCloseButton  className='absolute left-0 top-10 h-15 w-15 ' size='lg' />
                    <h2 className='font-medium text-[21px] absolute left-12 top-[11px]'>Settings</h2>
                </div>
                <DrawerBody>
                    <div className='flex flex-col absolute z-10 bg-white  w-[150px] items-center   '>
                        <div className='w-full flex h-14 w-full items-center '><Link to={`/user/${user._id}/books`}className='w-full flex justify-center hover:text-violet-600'><i className="fas fa-book pt-[4px] absolute left-0"></i>My books</Link></div>
                        <div className='w-full  flex items-center w-full h-14'><Link to={`/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600'><i className="fa-regular fa-user pt-1.5 absolute left-0"></i>My Account</Link></div>
                        <div className='w-full  flex h-14 w-full items-center '><Link to={`/edit/user/${user._id}`}className='w-full flex justify-center hover:text-violet-600'><i
                            className="fa-regular fa-pen-to-square pt-[4px] absolute left-0"></i>Edit account</Link></div>
                        <div className='w-full  flex h-14 w-full items-center'><Link to={`/favorites/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600 '><i className="fa-regular fa-star pt-[4px] absolute left-0 "></i><p className='w-[86px] text-left'>Favorites</p></Link></div>
                        <div className='w-full  flex h-14 w-full items-center' onClick={logOut}><div className='w-full flex justify-center hover:text-violet-600 '><i className="fa-solid fa-arrow-right-from-bracket pt-[4px] absolute left-0 "></i><p className='w-[86px] text-left'>Logout</p></div></div>
                    </div>


                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>)
}