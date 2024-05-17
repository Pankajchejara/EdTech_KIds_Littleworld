import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from 'react-router-dom';
import Appcontextprovider from '../src/context/Appcontext'
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Appcontextprovider >
     <BrowserRouter   >
     {<App />}
   
    <Toaster />
    </BrowserRouter>
  </Appcontextprovider>
 
);
