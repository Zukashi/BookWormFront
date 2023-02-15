import React, {useEffect, useState} from 'react';
import {HomeNav} from "../Home/HomeNav";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useLocation, useParams} from "react-router";
import {useNavigate} from "react-router-dom";
export const ProgressBookChange =() => {
    const axiosPrivate = useAxiosPrivate();
    const {user} = useSelector((root:RootState) => root.user)
    const {bookId, status} = useParams();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const [book, setBook] = useState<any>();
    const [pageNumber, setPageNumber] = useState<number>(0)
    useEffect(() => {
        (async() => {
            const res = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/book/${bookId}/${status}`);
            console.log(res.data)
            setBook(res.data.book)
        })()
    }, []);

    const updateProgress = async () => {
        console.log(pageNumber)
        await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/book/${bookId}/${status}/${pageNumber}`);
         navigate(`${location.state.location.pathname}`,{replace:true,state:location.state.status})
    }
    return (<>
    <HomeNav/>
        <main>
            <div className='pt-20'></div>
            <h2 className='text-4xl font-medium text-center'>Update Your Status</h2>
            <div className='flex font-medium justify-center mt-[10%]'><span>I'm on page <input onChange={(e) => setPageNumber(parseInt(e.target.value))} className='w-12 border-[1px] border-[#888] rounded-md outline-0 focus:outline-black focus:outline-2  py-0.5  px-2' type="number"/> of {book?.number_of_pages}</span></div>

            <div className='flex justify-center mt-4'>
                <label ><input type="checkbox"/> I've finished this book</label>
            </div>
            <div className='flex justify-around mt-5'><button className='px-6 py-1 w-[45%] border-[1px] border-black text-black bg-white '>Cancel</button><button onClick={updateProgress} className='px-6 py-1 bg-[#382110] w-[45%] text-white border-[1px] border-[#382110]'>Save Progress</button></div>
        </main>
    </>)
}