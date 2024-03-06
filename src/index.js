import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Floor from "./components/Floor";
import reportWebVitals from './reportWebVitals';
import {Canvas} from "@react-three/fiber";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Canvas
        camera={
            {
                position: [0, 5, 60],
                fov: 75
            }
        }
    >
        <color attach="background" args={["lightblue"]}/>

        <Floor/>
    </Canvas>
);


reportWebVitals();
