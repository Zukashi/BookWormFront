import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";


const useAxiosPrivate = () => {

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
                    await fetch(`http://localhost:3001/auth/refreshToken`,{
                        method:'POST',
                        credentials:'include'
                    });

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

export default useAxiosPrivate;