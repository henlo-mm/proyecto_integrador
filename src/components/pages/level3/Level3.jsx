import {Perf} from "r3f-perf";
import {Physics} from "@react-three/rapier";
import {Suspense, useEffect, useRef, useState} from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environment";
import {Canvas} from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import {Html, KeyboardControls, OrbitControls} from "@react-three/drei";
import Controls from "./controls/Controls";
import Wolverine from "./characters/avatar/Wolverine";
import Camera from "../../camera/Camera";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";

export default function Level3() {

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
        <Suspense fallback={<LoadingScreen/>}>
            <KeyboardControls map={map}>
                <Canvas
                    shadows={true}
                >
                    {/*  <Perf position="top-left" /> */}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                    />
                    <Lights/>
                    <Environments/>
                    <Physics debug={true}>
                        <World/>
                        {/*<Juggernaut />
                       <Wolverine />
                       <Camera  playerRef={wolverineRef} />*/}
                        <Controls/>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </Suspense>
    )
}