import * as React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, useDisclosure, Button, Input, Image,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";



export  function DrawerComponent() {
    const user = useSelector((state: RootState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef :any = React.useRef()

    return (
        <><div className='absolute top-0'>
            <button ref={btnRef} onClick={onOpen} className='w-10 h-10 fixed z-20 mt-1'><Image  boxSize='30px' src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"></Image></button>
            </div>
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
                            <div className='w-full  flex items-center w-full h-14'><Link to={`/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600'><i className="fa-regular fa-user pt-1.5 absolute left-0"></i>My Account</Link></div>
                            <div className='w-full  flex h-14 w-full items-center '><Link to={`/edit/user/${user._id}`}className='w-full flex justify-center hover:text-violet-600'><i
                                className="fa-regular fa-pen-to-square pt-[4px] absolute left-0"></i>Edit account</Link></div>
                            <div className='w-full  flex h-14 w-full items-center'><Link to={`/favorites/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600 '><i className="fa-regular fa-star pt-[4px] absolute left-0 "></i><p className='w-[86px] text-left'>Favorites</p></Link></div>
                        </div>

                    </DrawerBody>

                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
    </>);
}