import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";
import {setDrawer} from "../../../features/Drawer";
import {useLocation} from "react-router";
import {apiUrl} from "../../../config/api";

export const    AvatarComponent = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const btnRef :any = React.useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [preview, setPreview] = useState('');
    const [delayBg, setDelayBg] = useState<boolean>(false);
    const logOut = async () => {
        await axiosPrivate.delete(`${apiUrl}/user/${user._id}/logout`);
        navigate('/')
    };
    useEffect(() => {
        ( async () => {
            const res = await axiosPrivate.get(`${apiUrl}/user/${user._id}`)
            setPreview(res.data.base64Avatar)
        })()
    }, []);
    useEffect(() => {
        if(delayBg) {
            setTimeout(() => {
                dispatch(setDrawer(open))
            }, 500)
        }else{
            dispatch(setDrawer(open))
        }
    }, [open])
    const changeModal = () => {

        setOpen(false)
        setTimeout(() => {
            setDelayBg(false)
        }, 500)
        setDelayBg(true)
    }
    if(!preview) return null
    return (<>

        <button ref={btnRef} role='navigation' aria-label='navigation' onClick={() => setOpen((prev) => !prev)} className='peer w-14 h-14 fixed z-20 mt-1 right-0.5 top-0.5'><img src={preview} alt="avatar that once clicked opens settings"/></button>
        {(!open && delayBg === true || open)  && <div className='w-screen h-screen  bg-[#333]/[0.65] fixed left-0   ' onClick={() => changeModal()} ></div>}


            <section className={`${open ? 'right-0    ' : '-right-96  '}   linear  w-72 h-screen fixed  duration-700 bg-white z-30`}>

                <header className='h-10 bg-gray pb-[60px] border-b-[rgb(221,221,221)] border-[1px] relative'><button aria-label='close user settings button' onClick={() => changeModal()}  className='absolute left-0 top-1/2 -translate-y-1/2 ' >
                    <i className="fa-solid fa-xmark px-2 py-4 fa-xl hover:bg-[#ddd] rounded-md"></i></button>
                    <h2 className='font-medium text-[21px] absolute left-12 top-1/2 -translate-y-1/2'>Settings</h2>
                </header>

                <main className='flex flex-col absolute z-10 bg-white  w-full items-center   '>
                    <div className={`w-full flex   h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer ${location.pathname === `/user/${user._id}/books` ? 'border-black border-2 bg-[#ddd]' : 'border-2 border-transparent'}`}><Link to={`/user/${user._id}/books`}className={`w-32 h-full flex  gap-2 `}><i className="fas fa-book mt-1"></i><p className=''>My Books</p></Link></div>
                    <div className={`w-full flex ${location.pathname === `/user/${user._id}/lists` ? 'border-black border-2 bg-[#ddd]' : 'border-2 border-transparent'} h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer`}><Link to={`/user/${user._id}/lists`}className='w-32 h-full flex  gap-2 '><i className="fas fa-list mt-1"></i><p className=''>My Lists</p></Link></div>
                    <div className={`${location.pathname === `/user/${user._id}` ? 'border-black border-2 bg-[#ddd]' : 'border-2 border-transparent'} w-full flex  h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer`}><Link to={`/user/${user._id}`} className='ml-2 w-32 h-full flex  gap-2 mr-1.5 '><i className="fa-regular fa-user mt-1"></i><p>My Account</p></Link></div>

                    <div className={`${location.pathname === `/edit/user/${user._id}` ? 'border-black border-2 bg-[#ddd]' : 'border-2 border-transparent'} w-full flex  h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer`}><Link to={`/edit/user/${user._id}`} className='w-32 h-full flex  gap-2 '><i
                        className="fa-regular fa-pen-to-square  mt-1  "></i><p className=''>Edit Account</p></Link></div>

                    <div className={`${location.pathname === `/favorites/user/${user._id}` ? 'border-black border-2 bg-[#ddd]' : 'border-2 border-transparent'} w-full flex  h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer`}><Link to={`/favorites/user/${user._id}`} className='w-32 h-full flex  gap-2 mr-1'><i className="fa-regular fa-star  mt-1  "></i><p className=''>Favorites</p></Link></div>

                        <div className='w-full flex  h-full  gap-2 flex   justify-center transition-all duration-200 w-full py-2 hover:bg-[#bbb] cursor-pointer' onClick={logOut}><div className='w-32 h-full flex  gap-2 '>
                            <i className="fa-solid  fa-arrow-right-from-bracket  mt-1 "></i>
                        <p className=''>Logout</p></div></div>
                </main>


            </section>

    </>)
}