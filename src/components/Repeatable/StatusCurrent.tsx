import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import { useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useLocation, useParams} from "react-router";
import { BookEntity } from 'types';
import {Spinner} from "@chakra-ui/react";


export const StatusCurrent = ({refresh, onDelete, book}:{
    refresh : () => void
    onDelete : () => void,
    book:BookEntity,
}) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((root:RootState) => root.user);
    const [bookStatus, setBookStatus] = React.useState<any>('');
    const [modal, setModal] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(true)
    const [statusUnformatted, setStatusUnformatted] = useState<string>("");
    const statusObjectToMap:{
        [read:string]: string,
        wantToRead:string,
        currentlyReading:string,
    } = {
        read:'Read',
        wantToRead:'Want to read',
        currentlyReading:'Currently reading'
    };
    const location = useLocation();
    const updateStatusOfBook = async (value:string) => {
        await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/${book._id}/${value}/${statusUnformatted ? statusUnformatted : 'notfound'}`)
        setBookStatus((prev:string) => {
            switch(value){
                case 'currentlyReading':
                    return 'Currently reading'
                case 'wantToRead':
                    return 'Want to read'
                case 'read':
                    return 'Read'
            }

        } )
        setModal(false);
        refresh();
    }
    const toggleModal = () => {
        setModal((prev) => !prev)
    }

    const clearStatus = async () => {
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book._id}/status`);
        refresh();
        setStatusUnformatted('')
        refreshStatus()
        toggleModal();
        onDelete()
    }

    const refreshStatus = () => {
        (async () => {
            const resStatusOfBook = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/${book._id}/status`);
            if(resStatusOfBook.data === 'not found shelf'){
                setBookStatus("")
            }else{
                setStatusUnformatted(resStatusOfBook.data)
                setBookStatus((prev:string) => {
                    switch(resStatusOfBook.data){
                        case 'currentlyReading':
                            return 'Currently reading'
                        case 'wantToRead':
                            return 'Want to read'
                        case 'read':
                            return 'Read'
                    }

                } )
            }
            setTimeout(() => {
                setLoading(false)
            },
                300)
        })();

    };
    useEffect(() => {
         refreshStatus()
    }, [bookStatus, onDelete]);
    if(!book) return <h1>123</h1>
    console.log(bookStatus)
    return (<>
        {location.pathname.split('/')[1] !== 'book' ?<div className={`sm:min-w-[130px] sm:max-w-[150px] ${ bookStatus === '' ? 'bg-[#3f8363]  flex ' :'bg-[#F2F2F2]  border-[1px] border-[#ccc] flex justify-around  items-center'}  rounded-xl text-[#ffffff] cursor-pointer `} onClick={bookStatus !== '' ? toggleModal : undefined}>

                <button className={`w-32     cursor-pointer py-2  ${bookStatus === "" ? 'border-r-[1px] border-r-amber-800 ':'py-[7px]' }`} onClick={bookStatus === '' ?  () => updateStatusOfBook('wantToRead'): undefined } >  {loading ? <Spinner color='black' size='sm'/> :<span className={`font-medium ${bookStatus !== "" && "text-black"}`}>{!bookStatus ? 'Want to read' : bookStatus}</span>}</button>
            {bookStatus === "" ? <button onClick={toggleModal} className=' flex justify-center items-center '>
                <i  className="fa-solid fa-angle-down color-[#fff] text-xl mt-1 ml-1 mr-1"></i></button>:

            <img className='h-4 w-auto mr-1' src="https://cdn-icons-png.flaticon.com/512/57/57055.png" alt="down icon"/>}
        </div>
            :
        <div className={`${ bookStatus === '' ? 'bg-[#3f8363] flex  gap-2 border-2 border-[#333] ' :' bg-[#F2F2F2] border-2 border-[#777] flex justify-around  items-center'}  rounded-3xl text-[#ffffff] cursor-pointer w-full`} onClick={bookStatus !== '' ? toggleModal : undefined}>
            <button className={`px-2 cursor-pointer py-2     ${bookStatus === "" ? 'border-r-[1px] ml-10 pr-12 border-r-amber-800 ': 'ml-4 pr-6 flex items-center gap-1 py-1.5 '}`} onClick={bookStatus === '' ?  () => updateStatusOfBook('wantToRead'): undefined } >{bookStatus !== '' && <img  className="h-4 w-4 inline-block" src="https://cdn-icons-png.flaticon.com/512/2997/2997896.png" alt="pen Icon for edit"/>} {loading ? <Spinner color='black' size='md'/> :<span className={`font-medium ${bookStatus !== "" && "text-black"}`}>{!bookStatus ? 'Want to read' : bookStatus}</span>}</button>{bookStatus === "" && <button onClick={toggleModal} className='w-7 flex justify-center items-center '>
                <i  className="fa-solid fa-angle-down color-[#fff] text-md mt-1 ml-1"></i></button>}
        </div>}

        {
            modal && <div className='w-screen h-screen top-0  left-0 right-0 fixed z-20 '>
                <div className='w-screen h-screen  bg-[#333]/[0.5] ' onClick={toggleModal}></div>

                    <div className={` w-screen  absolute left-1/2 -translate-x-1/2 md:bottom-1/2 md:translate-y-1/2 w-screen bg-white rounded-xl pb-10 max-w-[410px]  ${!modal  ? '-bottom-[268px]' : '-bottom-2'}`}>
                        <div className='w-[85%] mx-auto'>
                            <div className='flex  gap-8 pt-6 pb-8 justify-between'><h3 className='font-medium text-lg '>Choose a shelf for this book</h3><span onClick={toggleModal} className='cursor-pointer px-2 py-0.5'><i className='fa-solid fa-xmark fa-xl '></i></span></div>
                            <div className='flex flex-col gap-3'>
                                {Object.keys(statusObjectToMap).map((status:string) => <div className='border-2 border-[#271c148f] rounded-3xl px-2 py-1.5 cursor-pointer flex ' onClick={() => updateStatusOfBook(status)}><button className='w-full '><span className='font-medium flex justify-center items-center'>{statusUnformatted === status &&
                                    <img className='inline h-5 my-auto w-5 ' src="https://cdn-icons-png.flaticon.com/512/2732/2732655.png" alt=""/>}<p className='inline '>{statusObjectToMap[status as keyof typeof statusObjectToMap]}</p></span></button></div>)}

                                {bookStatus !== '' && <div className='w-full flex justify-center gap-2 py-2 cursor-pointer' onClick={clearStatus}><img className='w-5 h-5' src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt=""/><span className='font-bold text-sm'>Remove from my shelf</span></div>
                                }
                            </div>
                        </div>

                </div>
            </div>
        }
    </>)
}