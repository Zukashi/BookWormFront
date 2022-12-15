import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerOverlay,
    Image,
    useDisclosure
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { SubcategoryMenu } from './SubcategoryMenu';
import {CategoryAdminMenu} from "./CategoryAdminMenu";

export const DrawerComponentAdmin = () => {
    const user = useSelector((state: RootState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef :any = React.useRef()
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
            }
        ]

    }
    return (
        <><div className='absolute top-0'>
            <button ref={btnRef} onClick={onOpen} className='w-10 h-10 fixed z-20 mt-1 left-2'><i
                className="fa-solid fa-bars text-3xl"></i></button>
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
                        <CategoryAdminMenu subcategories={subcategories}/>
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>);
}