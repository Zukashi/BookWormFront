import React, {useEffect} from 'react';
import './App.css';
import {LoginPageView} from "./Views/LoginPageView";
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {AllRoutes} from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {userUpdate} from "./features/User/userSlice";
import {RootState} from "./app/store";
function App() {

  return (
      <BrowserRouter>
      <ChakraProvider>
        <AllRoutes/>
      </ChakraProvider>
      </BrowserRouter>
  );
}

export default App;
