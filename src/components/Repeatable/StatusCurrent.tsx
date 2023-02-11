import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useLocation, useParams} from "react-router";


export const StatusCurrent = ({refresh}:{
    refresh : () => void
}) => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((root:RootState) => root.user);
    const {book} = useSelector((root:RootState) => root.book);
    const [bookStatus, setBookStatus] = React.useState<any>('');
    const [modal, setModal] = useState<boolean>(false);
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
        await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/${book._id}/${value}`)
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
        setModal(false)
    }
    const toggleModal = () => {
        console.log(123);
        setModal((prev) => !prev)
    }

    const clearStatus = async () => {
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book._id}/status`);
        refresh();
        setStatusUnformatted('')
        refreshStatus()
        toggleModal();

    }
    const refreshStatus = () => {
        (async () => {
            const resStatusOfBook = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/${book._id}/status`);
            console.log(resStatusOfBook);
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
        })()
    }
    useEffect(() => {
         refreshStatus()
    }, [bookStatus]);
    return (<>
        {location.pathname.split('/')[1] !== 'book' ?<div className={`${ bookStatus === '' ? 'bg-[#409d69] flex' :'bg-[#F2F2F2] border-[1px] border-[#ccc] flex justify-around  items-center'}  rounded-xl text-[#ffffff] cursor-pointer w-full`} onClick={bookStatus !== '' ? toggleModal : undefined}>
            <button className={`px-2 cursor-pointer py-1.5  ${bookStatus === "" && 'border-r-[1px] border-r-amber-800'}`} onClick={bookStatus === '' ?  () => updateStatusOfBook('wantToRead'): undefined } ><span className={`font-medium ${bookStatus !== "" && "text-black"}`}>{!bookStatus ? 'Want to read' : bookStatus}</span></button>{bookStatus === "" ? <button onClick={toggleModal} className='w-7 flex justify-center items-center '>
                <i  className="fa-solid fa-angle-down color-[#fff] text-xl mt-1 ml-1"></i></button>:

            <img className='h-4 w-4' src="https://cdn-icons-png.flaticon.com/512/57/57055.png" alt="down icon"/>}
        </div>
            :
        <div className={`${ bookStatus === '' ? 'bg-[#3f8363] flex  gap-2 ' :' bg-[#F2F2F2] border-2 border-[#777] flex justify-around  items-center'}  rounded-3xl text-[#ffffff] cursor-pointer w-full`} onClick={bookStatus !== '' ? toggleModal : undefined}>
            <button className={`px-2 cursor-pointer py-1.5     ${bookStatus === "" ? 'border-r-[1px] ml-10 pr-12 border-r-amber-800 ': 'ml-4 pr-6 flex items-center gap-1'}`} onClick={bookStatus === '' ?  () => updateStatusOfBook('wantToRead'): undefined } >{bookStatus !== '' && <img  className="h-4 w-4 inline-block" src="https://cdn-icons-png.flaticon.com/512/2997/2997896.png" alt="pen Icon for edit"/>}<span className={`font-medium ${bookStatus !== "" && "text-black"}`}>{!bookStatus ? 'Want to read' : bookStatus}</span></button>{bookStatus === "" && <button onClick={toggleModal} className='w-7 flex justify-center items-center '>
                <i  className="fa-solid fa-angle-down color-[#fff] text-md mt-1 ml-1"></i></button>}
        </div>}

        {
            modal && <div className='w-screen h-screen top-0  left-0 right-0 fixed z-20'>
                <div className='w-screen h-screen  bg-[#333]/[0.5] ' onClick={toggleModal}></div>
                <div className={`w-screen mx-auto absolute -bottom-2 left-0 w-screen bg-white rounded-xl pb-10 ${!modal  ? '-bottom-[268px]' : '-bottom-2'}`}>
                    <div className='w-[85%] mx-auto'>
                        <div className='flex  gap-16 pt-6 pb-8 justify-between'><h3 className='font-medium text-lg'>Choose a shelf for this book</h3><span onClick={toggleModal}>X</span></div>
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