import React, {useEffect, useRef, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {changeCurrentEditListName, setSecondModal} from "../../features/HomeSlice";
import {Spinner, useToast} from "@chakra-ui/react";
import {toast} from "react-toastify";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../config/api";

export const CheckboxList = ({listName, book, checked, list, refreshLists}:{listName:string, book:any, checked:boolean, list:string[], refreshLists: () => void}) => {
    const axiosPrivate = useAxiosPrivate();
    const {home,currentEditListName} = useSelector((root:RootState) => root.home);
    const dispatch = useDispatch();
    const {user} = useSelector((root:RootState) => root.user);
    const [newListName, setNewListName] = useState<string>('');
    const [loading ,setLoading] = useState(false);
    const toastify = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const [checkedCheckbox, setCheckedCheckbox] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const handleEntityAddSubmit = async() => {
        setCheckedCheckbox((prev) => !prev)
        if(checkedCheckbox === false) {
            await axiosPrivate.put(`${apiUrl}/user/${user._id}/list/${listName}/book/${book._id}`);
            toast.success(`${book.title} added to ${listName}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                theme:'dark',
                autoClose:3000
            });
            if(location.pathname.split('/')[3] === 'lists'){
                toastify({
                    title: 'Success',
                    description: `${book.title} added to ${listName}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }

        }else{
            await axiosPrivate.delete(`${apiUrl}/user/${user._id}/list/${listName}/book/${book._id}`);
            toast.success(`${book.title} removed from ${listName}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                theme:'dark',
                autoClose:3000
            });
            if(location.pathname.split('/')[3] === 'lists'){
                toastify({
                    title: 'Success',
                    description: `${book.title} removed from ${listName}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        refreshLists();
    }
    useEffect(() => {
        (async() => {
            const res = await axiosPrivate.get(`${apiUrl}/user/${user._id}`)
            let found = null;
            Object.keys(res.data.lists).forEach((key:string) => {
                res.data.lists[listName].find((id:string) => {
                    if(id === book._id.toString()) {
                        found = key
                    }
                })
            });
            if(typeof found ==='string') {
                setCheckedCheckbox(true)
            }
        })()
    }, []);
    const changeHandler = (value:string) => {
        setNewListName(value);
        void refreshLists();

    }
    const handleChangeListName = async () => {
        setLoading(true);
        await axiosPrivate.put(`${apiUrl}/user/${user._id}/list/${currentEditListName}`, {newListName});
        toast.success(`List name changed from ${currentEditListName} to ${newListName}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            theme:'dark',
            autoClose:3000
        });
        if(location.pathname.split('/')[3] === 'lists'){
            navigate(`/user/${user._id}/lists?list=${newListName}`)
            toastify({
                title: 'Success',
                description: `List name changed from ${currentEditListName} to ${newListName}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            window.location.reload()
        }
        refreshLists();
        setLoading(false)
        dispatch(setSecondModal(false));

    }
    const deleteList = async () => {
        await axiosPrivate.delete(`${apiUrl}/user/${user._id}/list/${currentEditListName}`);
        toast.success(`List ${currentEditListName} deleted`, {
            position: toast.POSITION.BOTTOM_CENTER,
            theme:'dark',
            autoClose:3000
        });
        if(location.pathname.split('/')[3] === 'lists'){
            navigate(`/user/${user._id}/lists`)
            toastify({
                title: 'Success',
                description:`List ${currentEditListName} deleted`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            window.location.reload()
        }
        refreshLists();
        dispatch(setSecondModal(false))
    }
    return (<> <form className='ml-4  mb-3 flex items-center w-full '><div className='pr-10 flex items-center  w-full justify-between' >
        <label className='flex items-center gap-3  text-lg cursor-pointer' > <input checked={checkedCheckbox}  className="focus:ring-0 h-5 w-5 focus:ring-offset-0 cursor-pointer border-2 border-black  " onChange={() => {
            void handleEntityAddSubmit();
        }
        }  type="checkbox" value={listName} key={listName} /> <p className='text-ellipsis overflow-hidden max-w-[100px] whitespace-nowrap'>{listName}</p></label>
        <i className="fa-solid fa-pen cursor-pointer" onClick={() =>  {
            dispatch(setSecondModal(true));
            console.log(listName)
            dispatch(changeCurrentEditListName(listName));
        }}></i>
    </div></form>
        {home.modal &&

            <div className='fixed left-0 right-0 top-0  z-10'>
            <div className=' flex justify-start items-start absolute -z-10'>

                <div className='h-72 w-72 bg-white rounded-md flex flex-col gap-3 absolute -right-[350px] -translate-x-[40%] z-30 '>
                    <div className='w-[90%] mx-auto relative h-full flex flex-col items-center'>
                        <i className="fa-solid fa-xmark fa-lg px-1 py-1 cursor-pointer absolute top-3 -right-2" onClick={() => {
                            dispatch(setSecondModal(false));
                        }}/>
                      <div className='relative before:content-[attr(data-tip)] before:absolute before:px-3 before:py-2 before:left-1/2 before:top-5
                      before:w-max before:max-w-xs
                      before:-translate-x-1/2 before:-translate-y-full
                      before:bg-[#333] before:text-white
                      before:rounded-md before:opacity-0
                      before:transition-all

                      after:absolute
                      after:left-1/2 after:top-[19px]
                      after:h-0 after:w-0
                      after:-translate-x-1/2 after:border-8
                      after:border-b-transparent
                      after:border-l-transparent
                      after:border-t-[#333]
                      after:border-r-transparent
                      after:opacity-0
                      after:transition-all
                      hover:before:opacity-100 hover:after:opacity-100

                      ' data-tip={currentEditListName}>
                          <h2 className='font-medium text-3xl text-center mt-4 mb-5 max-w-[230px] w-2xl  text-ellipsis whitespace-nowrap overflow-hidden'>Edit list: {currentEditListName}</h2>
                      </div>
                        <p>{newListName ? newListName.length + '/20' : '0/20'}</p>
                        <input type="text" maxLength={20} placeholder='Enter new list name...' onChange={e => changeHandler(e.target.value)} className='px-1 py-0.5 mt-1 border-2 rounded-xl border-black px-2 py-1'/>
                        {  loading ? <div className='bg-black px-3.5 py-2 rounded-xl text-3xl mt-3'>
                            <Spinner className='' color={'white'}/>
                        </div> : <i className="cursor-pointer fa-solid fa-check px-3 py-2 rounded-xl text-3xl bg-black text-green-600 mt-3" onClick={() => {
                            void handleChangeListName();
                            console.log(1234)
                        }}></i>}
                        <h3 className='font-medium text-red-800 hover:underline-offset-2 cursor-pointer absolute bottom-3 right-3' onClick={() => deleteList()}>Delete list</h3>
                    </div>
                </div>
            </div>
            </div>


        }
    </>)
}