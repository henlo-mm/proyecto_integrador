import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import LoadingScreen from "../../loading/LoadingScreen";
import { Html } from '@react-three/drei';
import Camera from "../../camera/Camera";
import Juggernaut from "./characters/enemies/Juggernaut";

export default function Level1() {

    const deadpoolRef = useRef();

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const map = useMovements();

    return (
        <KeyboardControls map={map} >
            <Canvas
                camera={
                    {
                        position: [0, 10, -2],
                        fov: 75
                    }
                }
                shadows={true}
            >
                {/* <Perf position="top-left" /> */}
                <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                />

                {showLoadingScreen ? (
                    <Html>
                        <LoadingScreen />
                    </Html>
                ) : (

                    <Suspense fallback={null}>
                        <Lights />
                        <Environments />
                        <Physics debug={false}>
                            <World />
                            <Juggernaut />
                            <Deadpool ref={deadpoolRef} />
                            <Camera  playerRef={deadpoolRef} />
                            <Controls />
                        </Physics>
                    </Suspense>
                )}
            </Canvas>
        </KeyboardControls>
    )
}