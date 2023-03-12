import React, {useEffect, useRef, useState} from "react";
import { BookEntity } from "../../../../BookWormBack/types/book/book-entity";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { UserEntity } from "../../../../BookWormBack/types/users/user.entity";
import {SpinnerComponent} from "../../SpinnerComponent";
import { SubmitHandler, useForm} from "react-hook-form";

export const AddToPersonalList = ({book}:{book:BookEntity}) => {
    const [modal, setModal] = useState<boolean>(false);
    const {user} = useSelector((state:RootState) => state.user);
    const {handleSubmit, register} = useForm<AddListValuesForm>();
    const {handleSubmit: handleSubmitListEntityAdd, register:registerList} = useForm<AddListValuesForm>();
    const [userRes, setUser] = useState<null | UserEntity>(null);
    const [addListClicked, setAddListClicked] = useState<boolean>(false)
    const axiosPrivate = useAxiosPrivate();
    type AddListValuesForm = {
        listName:string
    };
    const refreshLists = async () => {
        const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
        setUser(res.data);
    }
    useEffect(() => {
        void refreshLists();
    }, []);
    if(!userRes){
        return <SpinnerComponent/>
    }
    const addListSubmit:SubmitHandler<AddListValuesForm> = async (data) => {
        await axiosPrivate.post(`http://localhost:3001/user/${user._id}/list/${data.listName}`);
        void refreshLists();
        setAddListClicked(false);
    };
    const handleEntityAddSubmit:SubmitHandler<AddListValuesForm> = async(data) => {
        await axiosPrivate.put(`http://localhost:3001/user/${user._id}/list/${data.listName}/book/${book._id}`);

    }
    console.log(Object.keys(userRes?.lists).length)
    return <>
        <button onClick={() => setModal((prev) => !prev )} className='  text-black text-md font-bold  rounded-2xl h-full hover:text-blue-600 px-1 '>
        <b className='flex items-start h-full'>Add to list</b>
        </button>
        {modal && <div className='w-screen h-screen top-0  left-0 right-0 fixed z-20'>
            <div className='w-screen h-screen  bg-[#333]/[0.65]' onClick={() => {
                setModal((prev) => !prev);
                setAddListClicked(false);
            }
            }></div>
            <div className=' absolute   top-[50%] bg-white  left-[50%]  -translate-y-[50%] bg-amber-50 w-60 h-60 rounded-xl -translate-x-[50%] '>
                    <div><i className="fa-solid fa-xmark fa-lg px-1 py-1 cursor-pointer absolute top-3 right-1" onClick={() => {
                        setModal(false);
                        setAddListClicked(false);
                    }
                    }></i></div>
              <div className='h-full w-full flex flex-col   items-center  justify-center '>
                  { (Object.keys(userRes.lists).length === 0 && !addListClicked) && <p className='font-bold text-lg absolute top-8  '>You don't have any lists</p>}
                  {(Object.keys(userRes.lists).length > 0 && !addListClicked) && <form onSubmit={handleSubmitListEntityAdd(handleEntityAddSubmit)}>
                      <div className='relative'>
                          <select className='appearance-none px-2  rounded-md ring-1  text-xl px-2 py-1 pr-8 mb-20' {...registerList('listName')} id="">
                              <option value="" disabled selected hidden>Choose a list</option>
                              {Object.keys(userRes.lists).map((listName:string) => <option value={`${listName}`}>{listName}</option>)}

                          </select>
                          <div><i className="fa-solid fa-chevron-down absolute top-[11px] right-2"></i></div>
                      </div>
                      <button className='absolute top-1/2 left-1/2 -translate-x-1/2 ring-1 -translate-y-1/2 font-medium px-4 py-2 ring-[#999] cursor-pointer hover:text-white hover:bg-black  hover:ring-black mt-2' type='submit'>Add Book</button>
                  </form>}
                    <p className={`cursor-pointer hover:text-blue-200 hover:bg-black font-medium px-2 py-2 bg-blue-200 ${Object.keys(userRes).length > 0 && 'absolute bottom-6 right-4'} ${addListClicked && 'hidden'}`} onClick={() => setAddListClicked(true)}>Create New List</p>
                    {addListClicked &&
                        <div>
                            <div className='absolute top-1 left-2 cursor-pointer ' onClick={() => {
                            setAddListClicked(false)
                            }
                            }>
                                <i className="fa-solid fa-arrow-left fa-lg"></i>
                            </div>
                            <form onSubmit={handleSubmit(addListSubmit)} className='flex flex-col' autoComplete='off'>
                                <input type="text" {...register('listName')}placeholder=' List name ...' className='ring-1 ring-black rounded-lg px-4 py-2 '/>
                                <button type="submit" className='cursor-auto'><i className="cursor-pointer fa-solid fa-check px-3 py-2 rounded-xl text-3xl bg-black text-green-600 mt-3"></i></button>
                            </form>
                        </div>
                    }
                </div>

            </div>
        </div>}
    </>
}