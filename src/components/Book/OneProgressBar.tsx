import React, {useEffect} from 'react'
import {motion, useAnimation} from "framer-motion";
import { BookEntity } from '../../../../BookWormBack/types/book/book-entity';
import {useInView} from "react-intersection-observer";

export const OneProgressBar =({isHighlighted,sumOfRatings,book,index}:{book:BookEntity, index:number,isHighlighted:  boolean[], sumOfRatings:number}) => {
    const {ref:scrollRef, inView:isInView} = useInView({
        threshold:0.6
    })
    const animation = useAnimation();
    const result = sumOfRatings && (((book as any).ratingTypeAmount[(book as any).ratingTypeAmount.length - 1 -  index] / sumOfRatings ) * 100);
    useEffect(() => {
        if(isInView){
            animation.start({
                width:`${result.toFixed()}%`,
                transition:{
                    duration:1,
                },
            })

        }
        if(!isInView){
            animation.start({
                width:0,
                transition:{
                    duration:1
                }
            })
        }
        console.log(isInView)

    },[isInView])
    return <>

        <div className={` py-[1rem]  px-[1rem] mr-2 group-hover:bg-[#ebebeb]   z-0 w-[80%] ${isHighlighted[(book as any).ratingTypeAmount.length - 1 - index] && 'bg-[#c1c1c1] group-hover:bg-[#9e9e9e]'
        } rounded-2xl`}>
            <motion.div ref={scrollRef}  className={`z-0 w-full bg-[#ebebeb] rounded-2xl group-hover:bg-[#ccc] ${isHighlighted[(book as any).ratingTypeAmount.length - 1 - index] && 'group-hover:bg-[#eee]'} `}><motion.div   className='h-3  rounded-xl bg-blue-600 '  animate={animation} initial={{width:0}} />
            </motion.div>
        </div>

    </>
}