import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {userUpdate} from "../features/User/userSlice";
import {useDispatch} from "react-redux";


export const useAxiosPrivate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const res = await axios(`http://localhost:3001/auth/refreshToken`,{
                        method:'POST',
                        withCredentials:true,
                    });
                    dispatch(userUpdate({
                        user:res.data.user,
                        token:res.data.token
                    }))

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return axiosPrivate;
}
