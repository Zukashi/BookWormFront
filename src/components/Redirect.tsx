import React, {useEffect} from 'react'
import {useAxiosPrivate} from "../hooks/useAxiosPrivate";
import {userUpdate} from "../features/User/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SpinnerComponent} from "./SpinnerComponent";
import {apiUrl} from "../config/api";

export const  Redirect = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        (async() => {
            try{
                const res = await axiosPrivate.post(`${apiUrl}/auth/refreshToken`);
                dispatch(userUpdate({
                    user:res.data.user,
                    token:res.data.token
                }))
                navigate('/home')
            }
              catch{  navigate('/login')}


        })()
    }, [])
    return <><SpinnerComponent/></>
}