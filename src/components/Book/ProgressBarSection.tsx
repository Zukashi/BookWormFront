import React, {useEffect, useState} from 'react';
import {OneProgressBar} from "./OneProgressBar";

export const ProgressBarSection = ({book, isHighlighted, changeFilter}:{book:any, isHighlighted:  boolean[], changeFilter:any}) => {

    const sumOfRatings =  book.ratingTypeAmount?.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,
        0
    );

    return <>
        <div className='flex flex-col gap-y-5  mt-4'>
        {book.ratingTypeAmount?.map((item:any,index:any) =>        <div key={item} className='flex   items-center  group cursor-pointer font-medium'onClick={() => changeFilter((book as any).ratingTypeAmount.length  - index)}>
            <div className='w-[4rem]'>
                <h3 className={`border-b-[0.19rem] w-fit   border-b-black mb-0.5 ${isHighlighted[(book as any).ratingTypeAmount?.length - 1 - index] && 'border-b-orange-400'} `}>{`${(book as any).ratingTypeAmount.length  - index}`} stars </h3>
            </div>
            <OneProgressBar isHighlighted={isHighlighted} sumOfRatings={sumOfRatings as number} book={book} index={index}/> <div className='w-20 flex text-[#707070] font-medium '>
                <div className='border-b-[1px] border-b-transparent group-hover:border-b-[1px] group-hover:border-b-black flex'>
                    <p className='mr-1'>
                        {(book as any).ratingTypeAmount[(book as any).ratingTypeAmount.length - 1 - index]}
                    </p> { sumOfRatings ? <p> ({(((book as any).ratingTypeAmount[(book as any).ratingTypeAmount.length -1 - index] / sumOfRatings ) * 100).toFixed(0)}%)</p>: <p className='inline-block'>(0%)</p>}
                </div>
            </div>   </div> )}
        </div>

    </>
}