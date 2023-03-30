import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {SpinnerComponent} from "../SpinnerComponent";
import {apiUrl} from "../../config/api";

export const Profile = () => {
  const [user, setUser] = useState<any | null>(null);
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

    useEffect(() => {
        (async () => {
           const res = await axiosPrivate.get(`${apiUrl}/user/${params.userId}`);
           if(res.status === 404) navigate('/home')
           setUser(res.data);
        })()
    }, []);

    if (!user){
        return <SpinnerComponent/>
    };
    return (<>

    <section className=' w-screen h-screen bg-[#fbfcff] pt-20  '>
    <div className='w-[90%]  flex flex-col mx-auto  shadow-black shadow-2xl  rounded-lg max-w-[768px]'>
      <div className='flex flex-col gap-5 p-[25px] text-center  bg-white  pb-[2vw]  w-full items-center border-b-2 border-b-[#ccc] rounded-t-lg'>
          <img className='w-20' src={user?.base64Avatar} alt=""/>
        <h1 className='text-3xl font-[600]'>{user?.username}</h1>
          <Link to={`/favorites/user/${params.userId}`} className='py-2 px-4 group'><h2 className='text-blue-600 text-medium cursor-pointer border-b-2 border-b-transparent group-hover:border-b-blue-600'>Favorites</h2></Link>
      </div>
      <div className="flex  gap-5 pt-[2vw] pb-[2vw] text-center w-11/12 mx-auto justify-start bg-white   rounded-lg ">



            <div className='text-left font-bold uppercase w-full text-[13px] flex flex-col md:flex-row justify-around '>
                <h3 className=' border-b-[1px] border-b-[#c1c1c1] py-2 md:hidden'><span className=''>Bookshelves</span></h3>
                <h3 className=' border-b-[1px] border-b-[#c1c1c1] '><Link to={`/user/${params.userId}/books?status=read`} className='pr-2 py-2  flex gap-0.5 group cursor-pointer ' ><span className='border-b-[1px] border-b-transparent hover:border-b-[1px] group-hover:border-black  '>Read </span><p className='text-[#999]'>({user?.shelves.read.length})</p></Link></h3>
                <h3 className=' border-b-[1px] border-b-[#c1c1c1]  '><Link to={`/user/${params.userId}/books?status=currentlyReading`} className='pr-2 py-2  flex gap-0.5 group cursor-pointer '><span className='border-b-[1px] border-b-transparent hover:border-b-[1px] group-hover:border-black  '>Reading</span><p className='text-[#999]'>({user?.shelves.currentlyReading.length})</p></Link></h3>
                <h3 className=' border-b-[1px] border-b-[#c1c1c1] '><Link to={`/user/${params.userId}/books?status=wantToRead`} className='pr-2 py-2  flex gap-0.5 group cursor-pointer '>
                    <span className='border-b-[1px] border-b-transparent hover:border-b-[1px] group-hover:border-black '>Want to read</span><p className='text-[#999]'>({user?.shelves.wantToRead.length})</p>
                </Link></h3>
            </div>
      </div>
    </div>

    </section>

  </>)
}