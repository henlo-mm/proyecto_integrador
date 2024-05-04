import {Perf} from "r3f-perf";
import {Physics} from "@react-three/rapier";
import {Suspense, useEffect, useRef, useState} from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import {Canvas} from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import {KeyboardControls, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import LoadingScreen from "../../loading/LoadingScreen";
import {Html} from '@react-three/drei';
import Camera from "../../camera/Camera";
import Juggernaut from "./characters/enemies/Juggernaut";
import Health from "./objects/Health";
import {HealthHUD} from "./hud/HealthHUD";

export default function Level1() {

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [activeHealths, setActiveHealths] = useState([true, true, true, true, true]);
    const [collectedLives, setCollectedLives] = useState(3);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const map = useMovements();
    const deadpoolRef = useRef(null);


    const onHealthCollected = (index) => {

        setActiveHealths((prev) => {
            const newHealths = [...prev];
            newHealths[index] = false;

            return newHealths;
        });
    };

    const handleCollisionWithTarget = () => {
        console.log('collision with target');
        setCollectedLives((prev) => {
            const newLives = Math.max(0, prev - 1);
            console.log('collision with target', newLives);
            return newLives;
        });
    };


    return (
        <KeyboardControls map={map}>
            <Canvas
                shadows={true}
                camera={
                    {
                        position: [0, 10, -2],
                        fov: 75
                    }
                }
            >
              {/*   <PerspectiveCamera makeDefault position={[20, 15, 20]} rotation={[0, -Math.PI / 2, 0]} fov="100" />
                <OrbitControls makeDefault
                               target={[0, 3, 0]}
                               enablePan={true}
                /> */}

                <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                />

                <Perf position="top-right"/>
                {showLoadingScreen ? (
                    <Html>
                        <LoadingScreen/>
                    </Html>
                ) : (

                    <Suspense fallback={null}>
                        <Lights/>
                        <Environments/>
                        <Physics debug={true}>
                            <World/>
                            <Deadpool ref={deadpoolRef}/>
                            {/*<Juggernaut targetRef={deadpoolRef} onCollisionWithTarget={handleCollisionWithTarget}/>
                            <Camera />*/}
                            {/*{activeHealths[0] && (
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
                            )}*/}

                            <Controls/>
                        </Physics>
                    </Suspense>
                )}
            </Canvas>
            <HealthHUD collectedLives={collectedLives}/>

        </KeyboardControls>
    )
}