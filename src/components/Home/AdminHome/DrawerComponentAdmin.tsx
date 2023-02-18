import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {CategoryHomeMenu} from "./CategoryHomeMenu";
import { CategoryAdminMenu } from './CategoryAdminMenu';
import {AvatarComponent} from "./AvatarComponentForNav";

export const DrawerComponentAdmin = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef :any = React.useRef();
    const subcategories = {
        Home:[{
        name:'Home Page',
        link:'/home'
    },
        {name:'Category Page',
         link:'/category'
        }],
        Admin:[{
            name:'Category Lists',
            link:'/categories'
        },
            {
                name:'Author',
                link:'/admin/author'
            },
            {
                name:'Books',
                link:'/admin/books'
            },
            {
                name:'Users',
                link:'/admin/users'
            }
        ]

    }
    return (
        <><div className='absolute top-0'>
            <button ref={btnRef} onClick={onOpen} className='fixed z-20  left-24 mt-1.5'><i
                className="fa-solid fa-bars text-4xl"></i></button>
            <AvatarComponent/>
        </div>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size='xs'
            >
                <DrawerOverlay />
                <DrawerContent className='relative'>
                    <div className='h-10 bg-gray pb-[60px] border-b-[rgb(221,221,221)] border-[1px]'><DrawerCloseButton  className='absolute right-0 top-10 h-15 w-15 ' size='lg' />
                        <h2 className='font-medium text-[21px] absolute left-12 top-[11px] tracking-wide'>BOOKWORM</h2>
                    </div>
                    <DrawerBody p={0}>
                        <CategoryHomeMenu subcategories={subcategories.Home}/>
                        <CategoryAdminMenu subcategories={subcategories.Admin}/>

                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>);
}