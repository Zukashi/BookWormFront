import React, {useEffect} from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {AllRoutes} from "./Routes";
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
