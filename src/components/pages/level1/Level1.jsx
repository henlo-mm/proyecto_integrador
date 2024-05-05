import {Perf} from "r3f-perf";
import {Physics} from "@react-three/rapier";
import {Suspense, useEffect, useRef, useState} from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import {Canvas} from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import {KeyboardControls} from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";
import Health from "./objects/Health";
import {HealthHUD} from "./hud/HealthHUD";

export default function Level1() {

    const [activeHealths, setActiveHealths] = useState([true, true, true, true, true]);
    const [collectedLives, setCollectedLives] = useState(3);

    const map = useMovements();


    const onHealthCollected = (index) => {

        setActiveHealths((prev) => {
            const newHealths = [...prev];
            newHealths[index] = false;

            return newHealths;
        });
    };

    const handleCollisionWithJuggernaut = () => {
        console.log('Colisión detectada con Juggernaut');
        setCollectedLives((prev) => Math.max(0, prev - 1));
    };

    const handleCollision = (event) => {

        console.log('Colisión con Juggernaut detectada');
        console.log('event', event);

        const { other } = event; // Other object involved in the collision
        if (other && other.userData?.name === "Juggernaut") { 
            setCollectedLives((prev) => Math.max(0, prev - 1));
        }
    };

    return (
        <Suspense fallback={ <LoadingScreen/> }>
            <KeyboardControls map={map}>

                <Canvas
                    shadows={true}
                >
                    <Perf position="top-right"/>
                 
                    <Lights/>
                    <Environments/>
                    <Physics debug={true}>
                        <World/>
                        <Deadpool  onCollision={handleCollisionWithJuggernaut} />
                        <Juggernaut onCollision={handleCollisionWithJuggernaut} />
                        {activeHealths[0] && (
                            <Health
                                position={[-5, 0.2, 5]}
                                onCollected={() => onHealthCollected(0)}
                            />
                        )}
                        {activeHealths[1] && (
                            <Health
                                position={[-1, 0.2, -1]}
                                onCollected={() => onHealthCollected(1)}
                            />
                        )}
                        {activeHealths[2] && (
                            <Health
                                position={[-4, 0.2, 5]}
                                onCollected={() => onHealthCollected(2)}
                            />
                        )}
                        {activeHealths[3] && (
                            <Health
                                position={[-3, 0.2, 4]}
                                onCollected={() => onHealthCollected(3)}
                            />
                        )}
                        {activeHealths[4] && (
                            <Health
                                position={[-2, 0.2, 7]}
                                onCollected={() => onHealthCollected(4)}
                            />
                        )}

                        <Controls/>
                    </Physics>
            
                </Canvas>
                <HealthHUD collectedLives={collectedLives}/>

            </KeyboardControls>
        </Suspense>

    )
}