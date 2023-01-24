import {Outlet, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

import {userUpdate} from "../features/User/userSlice";
import {useDispatch} from "react-redux";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate";

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
                const res = await axiosPrivate.post(`http://localhost:3001/auth/refreshToken`)
                if(res.status === 403){
                    console.log(41)
                    navigate('/')
                }

                dispatch(userUpdate({
                    user:res.data.user,
                    token:res.data.token
                }))
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

    useEffect(() => {

    }, [isLoading])
    console.log(isLoading)
    return (
        <>
            {!isLoading && <Outlet/>}
        </>
    )
}

export default PersistLogin
