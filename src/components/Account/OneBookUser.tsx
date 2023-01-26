import React from 'react';

export const OneBookUser = (props:{id:string}) => {
    console.log(props)
    return <h1>{props.id}</h1>
}