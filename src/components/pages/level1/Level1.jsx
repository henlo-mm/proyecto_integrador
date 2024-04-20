import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import { OrbitControls } from "@react-three/drei";

export default function Level1() {

    return (
            <Canvas
                camera={
                    {
                        position: [55, 5, -10],
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
                    </Physics>
                </Suspense>
            </Canvas>
    )
}