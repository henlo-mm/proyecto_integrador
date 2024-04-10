import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Experience from "./components/Experience";
import reportWebVitals from './reportWebVitals';
import GameStats from './components/html/GameStats';
import { Canvas } from '@react-three/fiber';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Canvas
            camera={
                {
                    position: [55, 5, -10],
                    fov: 75
                }
            }
            shadows={true}
        >
            <Experience />
        </Canvas>

      {/*   <GameStats /> */}

    </>
   

);


reportWebVitals();
