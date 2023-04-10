import {Outlet, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";

import {userUpdate} from "../features/User/userSlice";
import {useDispatch} from "react-redux";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate";
import {apiUrl} from "../config/api";
import {SpinnerComponent} from "./SpinnerComponent";
import {HomeNav} from "./Home/HomeNav";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    // @ts-ignore
    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                const res = await axiosPrivate.post(`${apiUrl}/auth/refreshToken`);
                if(res.status === 403){
                    navigate('/login')
                }
                dispatch(userUpdate({
                    user:res.data.user,
                    token:res.data.token
                }));
                navigate('/home')
            }
            catch (err) {
                navigate('/')
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        verifyRefreshToken()
        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken

        return () => isMounted = false;
    }, [])

    if(isLoading){
        return <SpinnerComponent/>
    }
    return (
        <>
            {!isLoading && <>
                <HomeNav/>
                <Outlet/></>}
        </>
    )
}

export default PersistLogin
