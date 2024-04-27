import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import WelcomeText from "../level2/world/WelcomeText";

export default function Level1() {

    const [pausedPhysics, setPausedPhysics] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPausedPhysics(false);
        }, 500);

        return () => clearTimeout(timeout);
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
                <Perf position="top-left" />
                <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                />
                <Suspense fallback={null}>
                    <Lights />
                    <Environments />
                    <Physics debug={true}  paused={pausedPhysics}>
                        <World />
                        <Deadpool />
                        <Controls />
                    </Physics>
                </Suspense>
            </Canvas>
        </KeyboardControls>
    )
}