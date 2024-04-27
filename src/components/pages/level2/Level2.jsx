import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environment";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Controls from "./controls/Controls";
import Wolverine from "./characters/avatar/Wolverine";

export default function Level2() {

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
                    <Physics debug={false}>
                        <World />
                        <Wolverine />
                    </Physics>
                </Suspense>
                <Controls />
            </Canvas>
        </KeyboardControls>
    )
}