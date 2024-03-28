import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Experience from "./components/Experience";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <color attach="background" args={["lightblue"]}/>
        <Experience/>
    </>
   

);


reportWebVitals();
