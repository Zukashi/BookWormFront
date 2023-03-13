import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
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
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";

export const AvatarComponent = () => {
    const {user} = useSelector((state: RootState) => state.user);
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [open, setOpen] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const btnRef :any = React.useRef();
    const navigate = useNavigate()
    const [preview, setPreview] = useState('');
    const [delayBg, setDelayBg] = useState<boolean>(false);
    const logOut = async () => {
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/logout`);
        navigate('/')
    };
    console.log(open)
    useEffect(() => {
        ( async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
            setPreview(res.data.base64Avatar)
        })()
    }, []);
    const changeModal = () => {

                setOpen(false)
        setTimeout(() => {
            setDelayBg(false)
        }, 500)
        setDelayBg(true)
    }
    return (<>

        <button ref={btnRef} onClick={() => setOpen((prev) => !prev)} className='peer w-14 h-14 fixed z-20 mt-1 right-0.5 top-0.5'><img src={preview} alt=""/></button>
        {(!open && delayBg === true || open)  && <div className='w-screen h-screen  bg-[#333]/[0.65] fixed left-0 ' onClick={() => changeModal()} ></div>}


            <div className={`${open ? 'right-0 ease-in' : '-right-96 ease-out'} duration-200     w-96 h-screen fixed  duration-700 bg-white z-30`}>

                <div className='h-10 bg-gray pb-[60px] border-b-[rgb(221,221,221)] border-[1px] relative'><button onClick={() => changeModal()}  className='absolute left-0 top-1/2 -translate-y-1/2 ' >
                    <i className="fa-solid fa-xmark px-2 py-4 fa-xl hover:bg-[#ddd] rounded-md"></i></button>
                    <h2 className='font-medium text-[21px] absolute left-12 top-1/2 -translate-y-1/2'>Settings</h2>
                </div>

                <div className='flex flex-col absolute z-10 bg-white  w-full items-center   '>
                    <div className='w-full flex  w-full items-center py-2'><Link to={`/user/${user._id}/books`}className='w-full  hover:text-violet-600'><i className="fas fa-book "></i></Link><p className='w-full'>My books</p></div>
                    <div className='w-full flex h-14 w-full items-center '><Link to={`/user/${user._id}/books`}className='w-full flex justify-center hover:text-violet-600'><i className="fas fa-book pt-[4px] absolute left-0"></i>My Lists</Link></div>
                    <div className='w-full  flex items-center w-full h-14'><Link to={`/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600'><i className="fa-regular fa-user pt-1.5 absolute left-0"></i>My Account</Link></div>
                    <div className='w-full  flex h-14 w-full items-center '><Link to={`/edit/user/${user._id}`}className='w-full flex justify-center hover:text-violet-600'><i
                        className="fa-regular fa-pen-to-square pt-[4px] absolute left-0"></i>Edit account</Link></div>
                    <div className='w-full  flex h-14 w-full items-center'><Link to={`/favorites/user/${user._id}`} className='w-full flex justify-center hover:text-violet-600 '><i className="fa-regular fa-star pt-[4px] absolute left-0 "></i><p className='w-[86px] text-left'>Favorites</p></Link></div>
                    <div className='w-full  flex h-14 w-full items-center' onClick={logOut}><div className='w-full flex justify-center hover:text-violet-600 '><i className="fa-solid fa-arrow-right-from-bracket pt-[4px] absolute left-0 "></i><p className='w-[86px] text-left'>Logout</p></div></div>
                </div>


            </div>

    </>)
}