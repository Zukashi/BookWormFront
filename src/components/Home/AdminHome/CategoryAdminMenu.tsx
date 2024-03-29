import React, {useState} from 'react';
import {SubcategoryMenu} from "./SubcategoryMenu";

export const CategoryAdminMenu = (props:any) => {
    const [selected, setSelected] = useState(false);
    return (<>
        <div className={`flex h-12 hover:bg-[#bbb] cursor-pointer transition-all items-center pl-7 ${selected && 'bg-amber-300 hover:bg-amber-300'}`} onClick={() => setSelected((value) => !value)}><h2>Admin</h2> {selected ? <i className='fa-solid fa-chevron-down absolute right-7 '></i>:<i className='fa-solid fa-chevron-right absolute right-7 '></i>}
        </div>
        {selected &&
            <div className='flex flex-col'>
                {props.subcategories.map((value:any,index:number) => <SubcategoryMenu key={index} link={value.link} name={value.name}/>)}
            </div>
        }
    </>)
}