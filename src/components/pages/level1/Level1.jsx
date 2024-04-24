import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";

export default function Level1() {

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
                    <Physics debug={true}>
                        <World />
                        <Deadpool />
                    </Physics>
                </Suspense>
                <Controls />
            </Canvas>
        </KeyboardControls>
    )
}