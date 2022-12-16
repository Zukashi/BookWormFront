import React, {useState} from 'react';
import {Link} from "react-router-dom";
export interface Subcategory   {
    link:string,
    name:string,
}

export const SubcategoryMenu = (props:Subcategory) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState(false)
    return (<>
        <Link to={props.link}><div className={`h-12 flex items-center pl-14 ${selectedSubcategory && 'text-amber-300'}`} onClick={() => setSelectedSubcategory(value => !value)}><h2>{props.name}</h2></div></Link></>)
}