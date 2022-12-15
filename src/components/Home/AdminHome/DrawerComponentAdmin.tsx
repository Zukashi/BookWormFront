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

export const DrawerComponentAdmin = () => {
    const user = useSelector((state: RootState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef :any = React.useRef()
    const [selected, setSelected] = useState(false);
    const subcategories = [{
        name:'Home Page',
        link:'/home'
    },
        {name:'Category Page',
         link:'/category'
        }
    ]
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
                        <div className={`flex h-12 items-center pl-7 ${selected && 'bg-amber-300'}`} onClick={() => setSelected((value) => !value)}><h2>Shop</h2> {selected ? <i className='fa-solid fa-chevron-down absolute right-7 '></i>:<i className='fa-solid fa-chevron-right absolute right-7 '></i>}
                        </div>
                        {selected &&
                        <div className='flex flex-col'>
                            {subcategories.map((value,index) => <SubcategoryMenu key={index} link={value.link} name={value.name}/>)}

                        </div>
                        }
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>);
}