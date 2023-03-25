import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {HomeNav} from "../Home/HomeNav";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Button, Checkbox, Select, Spinner, Textarea, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {SpinnerComponent} from "../../SpinnerComponent";


export const ReviewEdit = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const {register, handleSubmit, setValue, getValues} = useForm();
    const [book, setBook] = useState<BookEntity|null>();
    const navigate = useNavigate();
    const {bookId} = useParams();
    const toast = useToast()
    const [loading, setLoading] = useState<boolean>(true);
    const stars = Array(5).fill(0);
    const axiosPrivate = useAxiosPrivate();
    const [status, setStatus] = useState('')
    const [review,setReview] = useState<any>({
        rating:0,
        description:'',
        status:'',
        user: {},
        spoilers:false,
    });
    const [lastReviewRating, setLastReviewRating] = useState(0)
    const [hover, setHover] = React.useState(0)

    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get(`http://localhost:3001/book/${bookId}`);
            setBook(res.data);
            const res2 = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/${bookId}/status`)
            setValue('status', res2.data);
            setStatus(res2.data)
            try{
                const res2 = await axiosPrivate.get(`http://localhost:3001/user/${user._id}/book/${res.data._id}`);

                setValue('description', res2.data.description ? res2.data.description : res2.data.desc)
                setValue('spoilers', res2.data.spoilers)
                setReview(res2.data);
                setLastReviewRating(res2.data.rating)
            }catch(e){
                console.log('error occurred')
            }
            setLoading(false)
        })();

    }, []);
    const deleteReview = async () => {
        navigate(`${`/book/${book?._id}`}`)
        await axiosPrivate.delete(`http://localhost:3001/book/${book?._id}/user/${user._id}/review/${lastReviewRating}`);
        await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${book?._id}/status`)
        navigate(`/book/${bookId}`,{replace:true,state:'delete'});
        toast({
            position:'bottom',
            title: 'Review deleted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
    const onSubmit = async (data:any) => {
        data.rating = review.rating;
        const currentStatus = getValues('status');
        try{
            await axiosPrivate.put(`http://localhost:3001/user/${user._id}/book/${bookId}`,JSON.stringify(data));
            await axiosPrivate.delete(`http://localhost:3001/user/${user._id}/book/${bookId}/status`);
            console.log(1234)
            await axiosPrivate.delete(`http://localhost:3001/book/${book?._id}/${lastReviewRating}`);
            await axiosPrivate.patch(`http://localhost:3001/user/${user._id}/${bookId}/${currentStatus}/${status}`)
            await axiosPrivate.put(`http://localhost:3001/book/${book?._id}/${review.rating}`);
            navigate(`/book/${bookId}`)
            toast({
                position:'bottom',
                title: 'Review edited.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }catch (e) {
            toast({
                position:'bottom',
                title: 'Something went wrong try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const handleMouseOver = (value:number) => {
        setHover(value)
    }
    const handleMouseLeave = () => {
        setHover(lastReviewRating)
    };
    const handleClick = async (value:number) => {
        setReview((prev:any) => ({
            ...prev,
            rating:value,
        }))
    }
    while(loading || !book){
        return  <SpinnerComponent/>
    }
    return (<>
        <HomeNav/>
        <div className='pt-20 w-[90vw] mx-auto max-w-[450px]'>

            <img src={`https://covers.openlibrary.org/b/isbn/${book?.isbn}-M.jpg?default=false`} onError={(e) => {
                e.currentTarget.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAaVBMVEV9eXr///99eXl2cnHy8vL19fV8enl/fH3j4+N0cnBzcXG0srNxbW3v7++joqKZlpaOi4urqai/vLyHhYXb2tvFxMTT0tN5dXPOzc6TkZKLiYrl5OWdmpt9e3ywrq+8u7ttbGlpZ2iIiIVHwnfLAAAP/ElEQVR4nO2dibajqhKGCURUnOJWgxqJ3ef9H/JSBY4Z+5yYpO/iXz1sNcFPLIqx2IQ4OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5/X+r6LrOJ4Q2XZfNz7Os6w50/rGM0PkHRNHleecLewgJzHXYlJrL8263a6QKa/3/xKnIQR/XzJxQSsBlwfkASeOs3KGOBX6IhsfdQj/iyu1eJsoMN0fueryXAa3Y8CC+pw9zOXKzaiJM2VVutiU3t9wEub1ivICgIzfLASUIlb2KT7UEF8Dtjdr1m+Y3MXZCOUOSnmGOUi76HXIbk+bMGMU/1D5sCkdlVrR5ArQ+5ZjfnohHbZrda+49sdwqsdxwrHgBdPBYBA/jvT6OYkkJEyfzXjjkt+fzuzfbjFubMHJLzNCBm4Q695Mf/TeEDOeygdyOOeHabuCRdpo7/Cj3CXOUs2DB/UvnfuXDB/EqfieVQK0Uyfuop/zD3LsMMpw2uwU3+MQmTtDhKKJYPzwCiGnp/yy3Mno7dxkT4xu8iRu8R0KgqHoAxNEJtvBt/RCGUpn8Bs9u9E7ufW15wCQqb+Rm+CMWzhS568FlCiuijD9pBm1bW664vQzrHiogPw9TfqdoP5xp11EK7WtG7qI0Cpp1vXOK38mNbtqnQufvkVj/rYjQZxNtwmjWPp9xtwNmJ/mKe9taZ8WtOqh7Yjzl2/xW6OkqzUEB8yzpxH1YcweDjm/l9uMTVHracQRi5GYRWI3Obwl1zCme5bcfadUT916Ek8Vv61OW3NgOqbHJMXBTMOv9IdNqTLlVkz/RLlB0yE2tH3yTO1lxczBtqO8FGblHY7A+XXC58N+58fofrHeAG9tTu0jSgXveYgV5wtSXuW04YdOw4PSz3JQgHON8zG9t7Z71d+UJbUJCAS1tyVMeOCL62fymJvvAe1huCeYb/TKFLYaTx5BDla87NPpqiC0Z+LypLyWl76kxl9z6RHsKTugrDDd2B4ohG+MAnw4fZhd0RXs27W9iudtilL8t+AU3ETFawJDfAMi4dWroE89yKAZWGbvST+vDN3Bz7F8abs45HbgFduOisZuJZ/Vj8DCaCmqHhO/tX479YrSH+bsFwlqgJbfTWTAU+DgRreH0Kh8BqShX/nLT/NbFRzChvQb8vxgfoRKa1YowKen8rGS6aYWtW9GmXSGGCl0/CptJkG1dC9VdWqzkOGh2QVsLHFJrNuPH8YNUPxDVzwCnbIXOTQqDKN3YJRqfddt1XZ6m5kHWX6ArbcTr5OTk5OTk9G+ksNk0ToXgD2PbhHMJggYYtExWdTp/W//sihTxsywr8AGQu8myBrhh6JKJQ5d2B8EoV7zIVlKfBFek8HBEzXIzHP8x10SEExC7JIo5Z/1upcPGrdYHAu5hQolyMXDrF5GMiKer3Fu3Wu/J5DfOrhHoB2B+4xxfMWdMfHZOUNDdwR/2Ldl+pP4hd8BW3Dj3tKuaIsMxoGPIcMbsNwzb/sYfPwc949b94CU3jH97jZBUhhn239Gd4JjckZkuwgeze+KGYbMZN06h5AL7XiLCLi9VRFluRbYeen2OG9CDX+CRB24cXLafoTFcFjgjb7g/SWxkuCsw5rOYc++neQ8KTuYkv5Ebx40LObPv/TSKyUWgPQr/Qu76NziNMrT+m5klBseRu/xWbkbAMefsr+Nm4Ow8n7K/i1vYNTTh38atK0hwhl0457Z8381NYFzei/8ufwIzrDiqDJ4c/Xcy+W+cIvlK/43cHJdXeZf1Jf/a+hLtRInctFSAW5j2CUxEmGVkFRrNV3KTuBy5CfrFFlp+AivTjH5tftt1U4bbPMNP6x9M+1t8a7kEoUUYbru6bezvmDH5of39QWKjJTfHKSjDLf1gxA6GtZH0i7h3M248wvUvnEp5tv358wjKBbS/xEc78ijdh/G1hiOuvaHPh7kpwfwu7QrJppESfX0xZ+Xk5OTk5OTk9Odaj50qXHduf+TTmhFYSQPnKec3V5JcpqWgQ2TPDatxput4rEbRpxbWULvYSCcqpy/oewwTaDiXNoVDcfg4gNDZ2Xl6+vyMm9oZNlzoZGeHLr7K+WIW7mq6a7VNU5gkl2vh/cZcIHjBny7oo3Z5/WqC09Gwzn6MVyv0kVp/Z66r6c5FKcP+ACyKwimPgY9jj7czoDB6PHW6ElxajwvTrwaa2QSN5kvZvDIVkO24Zr+YZ+l6wVv0aIk4N8srdb9WmYWLuZ3q4zCi4+F6ObxNMMzTUIrcHFeqXywEVHbmZFwNuSKqQ20juBx4vq7vYqFe9Khrys03UgkZjitcheHG+KE6HDIYpiGf4x4SnHPvQaZT9CMofwE3paZjGKKhwApXyw1hUCZgBwfWJpN4mN82QTJx70UMwWlmatO/ld/JFL/261HPlDK7JhQXOeNBZ3JKYlQAPo0J2EkGb3CXm48JzrmVWZgXA28ub+R3QvjkUR5lN4yTwVhfj0+IURYm7A+7waGCjiXcDDL/KW5MMJnetOVGSRgZ6tktbvV8NxoX+mcQGRdDMuBR9r/gJxwhySQEbgFzGICPQJ98nxuLRVNBgpfcnOBXbuf309zsB8aEG8xNuAm85H+G23lCV3G4WreE8BfPJ4+5wwrMGQbfmktu9F3pHTt5mhtcRcVYYodG7IvUlSYYB5ziGMugvQO6SP6QG7xnxWD2pzIFHLmhxoRFvxBWoG6Wy2nlysMp5g6tAXMd85JhFI7mTm2O4foGiMkoh3Gc+9wmQfD4ezJxH0ANDg+l7JYfTKb1+I9yG11FTNEoTVQcGEphAlQTcII4Fq8p0d79h9wmQU5MggP3pFMGI7eP/Hf5oLakPgbzKRrbqpvjqoyz5LEJ+NOWkxmTxAu4vP8et0lQV4nxOH2yJAoyphtVj7iD+9xcgqs4wNC1aTAoU/WUMeYXVjpiCBHAuZv4Lrfi6HtamyBERFvuoIS4tMTUhDe5k0EPAtgoeLdEOw0uITcj8NZgKJ4Pt02wSQsROMd4mExoHnCbh4M17hhmB3UC2reEQJlQHDy0wlvlUgyL8uX9YonvvvKhIChYHgCtZuM+fidD/QMZmGNZaayHuc3NZwn6kODIjV0M/X5brNfUTX8yrMe/v/hjvRQKW07gruvCmglftXc8rK9vcq8ThFb63H9Tsyrrph98MvAuTpa3wSklMJQE/urs5rxYfgLajbe5sTQuEmSr+hLt6D/X8/DmkyGY08OmoBbUMInZRsG4xTHecwdFVve3bnHLiwTjNbcHo/3/sb7EDk1rywLW8Ni7EWbaI4MBeWwU/ralBWegCn47v3HNUjF8GtvBS24Mlq2vcJPnuRUxDz8cg0VAn4FKbIju0eXZ+GebnSm6sWV+TwFE2gvuMF7KHreYIJaQvY+9nxbNP5PGvsd+Gtjjyk747YKpcP+JaWMMzGa4u7FpjBnG9M2KQUgMwtH0W55z44or88++yPG5hptDk2FnPbM32XytKx5MF/blGM6Jsfzbczf7O7Y/dRhbMCYqjmlujD4E34Jd5v0IYsK9DnLBPcnzIcF2XPtrE2RLj3SEMYd1uGnNnu6nKXyP84hwM0MG3JE1EzSMapwUMxGK2mz26MzWMbq7DBOYRmzMDRbcp1xAYNKa+8hEsDzT3+5fKqgd5iemhthwAWoQdfmR4YPFUv71BOefIBbHX33zMq2b1IrwZXQZuI/V2srLwkE5V4ujpeQVj8DleHl+lq/PzuPXblGbYbTVGN0zYWN0MY53EXa2SGEa7JsuGj+xPrs+8/pNO+itcLnh6PqjXj7UlbNPd+adnJycnJycnJyc3q63xU+9+kbvARdCvGxVse4QMyEezWC/RH5Z1n2e+bG+3b/sidgVDiIWRXf+qcu3rK727TiMV1aphmd/iE4hKpoyERd5FdikTm/hno+wesdzEf7Ra9b5zETbLydB3s4NSupOPW3xTPj50Vul8BlutJm8uItOcW8dJopzcPntz3GjxaSE3Qzoh2kDndPl1a9+lFtrX7XiehkF59HUa/N4Gzdu/XqbGwi6qxsdM5Gf7n2LDbvKbqImiqJc3uXWmX7mbDach05PXQT+r7n5WafdbjMqBVP2u1P4gFtbeu+PA+QwbVtUD76guWHScZfKu/f/19yQa8FjbkNuv/QENdpJsiH3z7PcQE5g+zamnqD+Jm5t5znjNLrpQq5zbxLc82fcu10moscfctxXBI1OScUbuOVi98L/jF006dkPt+c+nLumeF33J4TED9tzhzBNm4hX7TJCxTu5vfhl3Ay5t7dvy/2qzZYc93Pcr9psyeW343bcjtv5E8ftuL+P25VLx+24HferuJ0/cdyO+/u4Xbl03I7bcb+K2/kTx+24v4/blUvH7bgd96u4nT9x3I77+7hduXTcjttxv4rb+RPHfVUnQd/AXe6fWx39JLfn7evwDdxExLzI0v54eoD/kHt/qvu0KagQdPty6SsRw65p+k/RnOs7YSJ3uU91fvAhESZEzPx2v3F+w3tNICCwEXGsbyqLtE6uo93kPlWdb4Bpk/8cg8HutuUelRz7TOIGXUV/Lduvc5dnX4gwFKT7KVcl/E3cY96FTMR+dIF+hbvMiQgZ89Or9vVOblAQHbTFx22/NJg19ykqtGXJpr8WWofc7L3cwNQ3uozJ7niL26sbndEiq24UBuQWm/gT2ZxTUH6O+upYBiuCU+Tr7Cx+Ru84407OuiDGxeqFeElQ1lV/zm2y7Tb5DQHMuFVeGMLfELYpz6t54TpmMRMkT1bcpw42w0tnQYxJWeWND5GvkBYLGf4rN+Humi7NQWmXHQqfSLvbXyya6DjAJxHX7i1F8szs5xw0+mH8fngNSR0dwlg/ti7NArYJO2RpOiQbbcC9kn7JxyrPCgpZFcdFbt24VxWhztyT5UbqtrbMGEkNwKrNzpU2tStV7sbc4ysP9CunmHuHqESO+iCYyPediJJOm1aDhXWPobxavq5lgztts1eXy3val33GBQuFn2LQc60RlU8KzuIGN1evO87gctcHjxplb8rv6X6l9s+aXWEBrBWjXLIC8voI0Cw+3HTcH+UGJRVszikU/HbunjFVw/6CEk5l9bPN9k9wI/pBe5oYjFqT1m3MQn4nJHpT7nCW6j5JTkFZHkFleUqSy16ErtChljn3qa8L6OGiivQgkSmNYJmIF5MXhdZRmScnaLt2zaHgEhqwwkg7QMb9Q9Odq+NpbgjHztRQJJ3btHadPzqR1tflVUyKmeTajXfnvg6SpHsNNIGgfabASE2QoZptlEhNoD+XumEq/LbryzFvk4jEfj8+y+kYZYWCDZolboRBzS9VUbMtHnUisNUEe108oE1amV8CYzeSVPaC3TgRfzFKGEo/He1iqNiDqlO6Rpf4VYqpjL/8ZdiGcr6rx4d+f7eIST62C7260zbxEY5/IW3/HTQez9l79pJ5jZT5RT0o/qpK+y1S9vdz/E3MTk5OTk5OTk5OTk5OX6H/Ad1QXEGE8PSgAAAAAElFTkSuQmCC"
            }} className='w-20 float-left mr-3' alt=""/>
            <h2 className='font-[700] font-sans text-2xl'>{book?.title}</h2>
            <h3> by {book?.author}</h3>
            <div className='flex items-center'>  {
                stars.map((_, index) => {
                    return (
                        <i className={`fa-solid fa-star text-sm  ${(book?.rating)  > index  && `text-[#faaf00]`} ` } key={index} ></i>

                    )
                })
            }
                <p className='inline-block text-[1rem] ml-1    font-medium'>{book?.rating.toFixed(2)} </p>
            </div>

            <div className='mb-16'></div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <label htmlFor="status"></label>
                <div className='flex justify-center'><Select className='h-5 w-[20vw]' w={'40%'} {...register('status')}>
                    <option value="read">Read</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want To Read</option>
                </Select></div>
                <h3 className='w-full flex justify-center mt-2  mb-1'>Your rating: </h3>
              <div className='flex justify-center mb-4'>  {
                  stars.map((_, index) => {
                      return (
                          <i className={`fa-solid fa-star text-3xl cursor-pointer ${(hover || review.rating)  > index  && `text-[#faaf00]`} ` } key={index}  onClick={() => handleClick(index+1)} onMouseOver={() => handleMouseOver(index+1)} onMouseLeave={() => handleMouseLeave()}></i>

                      )
                  })

              }</div>
               <div className=' flex justify-center'> <Textarea {...register('description')} className='' placeholder='Write a review (optional)'/></div>
                <div className='flex mt-4 '><label><Checkbox {...register('spoilers')} iconSize='' className='w-4 h-4 mt-1 mr-2  '/>This review contains spoilers</label></div>
                <button type='submit' className='font-medium text-xl bg-black px-4 py-2 rounded-xl text-white mt-5'>Submit</button>
                <button className='font-medium text-xl bg-white px-4 py-2 rounded-xl text-black border-2 border-amber-300 border-green-400 bg-blue-500 ml-4' onClick={deleteReview}>Delete</button>
            </form>

        </div>
    </>)
}