import React from "react";
import * as ReactDOM from 'react-dom/client';
import { App } from "./modules/app";
import { BrowserRouter } from "react-router-dom";
import "@styles/fonts.scss";

const container = document.getElementById( "main" );
const root = ReactDOM.createRoot( container );

root.render(<App/>);



