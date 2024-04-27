import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environment";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import { Html, KeyboardControls, OrbitControls } from "@react-three/drei";
import Controls from "./controls/Controls";
import Wolverine from "./characters/avatar/Wolverine";
import Camera from "../../camera/Camera";
import LoadingScreen from "../../loading/LoadingScreen";

export default function Level2() {

    const wolverineRef = useRef();

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
               {/*  <Perf position="top-left" /> */}
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
                            <Wolverine />
                            <Camera  playerRef={wolverineRef} />
                            <Controls />
                        </Physics>
                    </Suspense>
                )}
            </Canvas>
        </KeyboardControls>
    )
}