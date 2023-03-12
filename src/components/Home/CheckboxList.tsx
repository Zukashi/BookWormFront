import React, {useEffect, useRef, useState} from 'react';
import {SubmitHandler} from "react-hook-form";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {changeCurrentEditListName, setSecondModal} from "../../features/HomeSlice";
import {current} from "@reduxjs/toolkit";

export const CheckboxList = ({listName, book, checked, list}:{listName:string, book:BookEntity, checked:boolean, list:string[]}) => {
    const axiosPrivate = useAxiosPrivate();
    const {home,currentEditListName} = useSelector((root:RootState) => root.home);
    const dispatch = useDispatch();
    const {user} = useSelector((root:RootState) => root.user);
    const [newListName, setNewListName] = useState<string>('')
    const [checkedCheckbox, setCheckedCheckbox] = useState<boolean>(false);
    const refP = useRef<HTMLParagraphElement | null>(null);
    const [modal ,setModal] = useState<boolean>(home.modal);
    console.log(list)
    const [editable, setEditable] = useState<boolean>(false);
    const handleEntityAddSubmit = async() => {
        setCheckedCheckbox((prev) => !prev)
        console.log(checkedCheckbox)
        if(checkedCheckbox === false) {
            console.log(333)
            await axiosPrivate.put(`http://localhost:3001/user/${user._id}/list/${listName}/book/${book._id}`);
        }else{
            await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/list/${listName}/book/${book._id}`)
        }

    }
    useEffect(() => {
        (async() => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
            let found = null;
            Object.keys(res.data.lists).forEach((key:string) => {
                res.data.lists[listName].find((id:string) => {
                    if(id === book._id.toString()) {
                        found = key
                    }
                })
            });
            console.log(found)
            if(typeof found ==='string') {
                setCheckedCheckbox(true)
            }
        })()
    }, []);
    const changeHandler = (value:string) => {
        setNewListName(value)
    }
    console.log(editable);
    const handleChangeListName = async () => {
        console.log(12345555)
        await axiosPrivate.put(`http://localhost:3001/user/${user._id}/list/${currentEditListName}`, {newListName})
    }
    const deleteList = async () => {
        console.log('111')
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/list/${currentEditListName}`)
    }
    return (<> <form className='ml-4  mb-3 flex items-center w-full '><div className='pr-3 flex items-center  w-full justify-between' >
        <label className='flex items-center gap-3  text-lg cursor-pointer' ><input checked={checkedCheckbox}  className="focus:ring-0 h-5 w-5 focus:ring-offset-0 cursor-pointer border-2 border-black  " onChange={() => {
            void handleEntityAddSubmit();
            console.log(12345)
        }
        }  type="checkbox" value={listName} key={listName} /> <p>{listName}</p></label>
        <i className="fa-solid fa-pen cursor-pointer" onClick={() =>  {
            dispatch(setSecondModal(true));
            console.log(listName)
            dispatch(changeCurrentEditListName(listName));
        }}></i>
    </div></form>
        {home.modal &&

            <div className='fixed left-0 right-0 top-0  z-10'>
            <div className=' flex justify-start items-start absolute -z-10'>

                <div className='h-60 w-60 bg-white rounded-md flex flex-col gap-3 absolute -translate-x-1/4 z-30 '>
                    <div className='w-[90%] mx-auto relative h-full flex flex-col items-center'>
                        <i className="fa-solid fa-xmark fa-lg px-1 py-1 cursor-pointer absolute top-3 -right-2" onClick={() => {
                            dispatch(setSecondModal(false));
                        }}/>
                        <h2 className='font-medium text-3xl text-center mt-4 mb-5'>Edit list: {currentEditListName}</h2>
                        <input type="text" placeholder='Enter new list name...' onChange={e => changeHandler(e.target.value)} className='px-1 py-0.5 mt-1'/>
                        <i className="cursor-pointer fa-solid fa-check px-3 py-2 rounded-xl text-3xl bg-black text-green-600 mt-3" onClick={() => {
                            void handleChangeListName();
                            console.log(1234)
                        }}></i>
                        <h3 className='font-medium text-red-800 hover:underline-offset-2 cursor-pointer absolute bottom-3 right-3' onClick={() => deleteList()}>Delete list</h3>
                    </div>
                </div>
            </div>
            </div>


        }
    </>)
}