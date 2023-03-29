import React, {useEffect, useRef, useState} from "react";
import { BookEntity } from "../../../../BookWormBack/types/book/book-entity";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {SpinnerComponent} from "../SpinnerComponent";
import { SubmitHandler, useForm} from "react-hook-form";
import {CheckboxList} from "./CheckboxList";
import {setSecondModal} from "../../features/HomeSlice";
import {ToastContainer} from "react-toastify";

export const AddToPersonalList = ({book}:{book:BookEntity}) => {
    const [modal, setModal] = useState<boolean>(false);
    const {user} = useSelector((state:RootState) => state.user);
    const {handleSubmit, register, watch, setValue} = useForm<AddListValuesForm>();
    const {handleSubmit: handleSubmitListEntityAdd, register:registerList} = useForm<AddListValuesForm>();
    const [userRes, setUser] = useState<null | any>(null);
    const {home} = useSelector((root:RootState) => root.home);
    const [checkboxValue, setCheckboxValue] = useState();
    const dispatch = useDispatch();
    const [addListClicked, setAddListClicked] = useState<boolean>(false);
    const [foundInlist, setFoundInList] = useState<boolean>(false);
    const [checked ,isChecked] = useState<boolean>(false)
    const axiosPrivate = useAxiosPrivate();
    type AddListValuesForm = {
        listName:string
    };
    const refreshLists = async () => {
        const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}`)
        setUser(res.data);
        let found = null;
        Object.keys(res.data.lists).forEach((key:string) => {
                res.data.lists[key].find((id:string) => {
                    if(id === book._id.toString()) {
                        setFoundInList(true)
                        found = key
                    }
                })
        });
        if(typeof found ==='string') {
            isChecked(true)
        }
    };

    useEffect(() => {
        void refreshLists();
    }, []);
    if(!userRes){
        return  null;
    }
    const addListSubmit:SubmitHandler<AddListValuesForm> = async (data) => {
        await axiosPrivate.post(`http://localhost:3001/user/${user._id}/list/${data.listName}`);
        void refreshLists();
        setAddListClicked(false);
        setValue('listName', '')
    };
    return <>

        <button onClick={() => setModal((prev) => !prev )} className='  text-black text-md font-bold  rounded-2xl h-full hover:text-blue-600 px-1 '>
        <b className='flex items-start h-full'>{checked ? 'Change list': 'Add to list'} <ToastContainer/></b>
        </button>
        {(modal) && <div className='w-screen h-screen top-0  left-0 right-0 fixed z-40'>
            <div className='w-screen h-screen  bg-[#333]/[0.65] absolute z-20' onClick={() => {
                if(home.modal === false){
                    setModal((prev) => !prev);
                    setAddListClicked(false);
                }else{
                    dispatch(setSecondModal(false))
                }
            }
            }></div>
            <div className={` absolute z-20   top-[50%] bg-white  left-[50%]  -translate-y-[50%] bg-amber-50 w-60 h-60 rounded-xl -translate-x-[50%] ${!addListClicked && 'pb-2 w-auto h-auto'}`}>
                    <div><i className="fa-solid fa-xmark fa-lg px-1 py-1 cursor-pointer absolute top-3 right-1" onClick={() => {
                        setModal(false);
                        setAddListClicked(false);
                    }
                    }></i></div>
              <div className={`h-full w-full flex flex-col    items-start  gap-2  ${addListClicked && 'justify-center'}`}>
                  { (Object.keys(userRes.lists).length === 0 && !addListClicked) && <p className='font-bold text-md text-center absolute top-8  '>You don't have any lists</p>}
                  {(foundInlist && !addListClicked) && <p className=' text-lg absolute left-4 '> Save to...</p>}
                  {(Object.keys(userRes.lists).length > 0 && !addListClicked) && <div className={`mt-8 max-h-52   overflow-x-hidden   ${Object.keys(userRes.lists).length > 5 && 'max-h-48'}`}>

                              {Object.keys(userRes.lists).map((listName:string) => <CheckboxList refreshLists={refreshLists} key={listName} listName={listName} book={book} checked={checked} list={userRes.lists[listName]} />)}
                  </div> }
                    <p className={`cursor-pointer hover:text-orange-600 font-medium flex w-full justify-center px-2 ${Object.keys(userRes.lists).length === 0 && 'mt-32'}  ${Object.keys(userRes.lists).length > 0 && ''} ${addListClicked && 'hidden'}`} onClick={() => setAddListClicked(true)}>Create New List</p>
                    {addListClicked &&
                        <div className='w-full'>
                            <div className='absolute top-1 left-2 cursor-pointer ' onClick={() => {
                            setAddListClicked(false);
                            setValue('listName', '')
                            }
                            }>
                                <i className="fa-solid fa-arrow-left fa-lg"></i>
                            </div>
                            <form onSubmit={handleSubmit(addListSubmit)} className='flex flex-col items-center w-full' autoComplete='off'>
                                <p>{watch('listName') ? watch('listName')?.length + '/20' : '0/20'}</p>
                                <input maxLength={20} type="text" {...register('listName')}placeholder=' List name ...' className='ring-1 ring-black rounded-lg px-4 py-2 '/>
                                <button type="submit" className='cursor-auto'><i className="cursor-pointer fa-solid fa-check px-3 py-2 rounded-xl text-3xl bg-black text-green-600 mt-3"></i></button>
                            </form>
                        </div>
                    }
                </div>

            </div>
        </div>}
    </>
}