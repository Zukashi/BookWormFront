import React from 'react';
import './App.css';
import {LoginPageView} from "./Views/LoginPageView";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
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
