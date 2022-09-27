import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";


export const Profile = () => {
  const user = useSelector((state:RootState) => state.user)
  return (<>

    {<h1>{user.email}</h1>}

  </>)
}