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
import {HealthHUD} from "./hud/HealthHUD";
import {useLives} from "../../context/LivesContext";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";
import CheckPoint from "../../checkpoint/CheckPoint";
import {updateUser} from "../../../db/users-collection";
import {useUser} from "../../context/UserContext";
import {useRewards} from "../../context/RewardsContext";

export default function Level2() {

    const wolverineRef = useRef();
    const defaultPosition = [0, 10, -65];

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [showLevelCompleted, setShowLevelCompleted] = useState(false);

    const {userData, isLoading} = useUser();


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const [colisiono, setColisiono] = useState(false);


    const getValidPosition = (position) => {
        if (position && !isNaN(position.x) && !isNaN(position.y) && !isNaN(position.z)) {
            return [position.x, position.y, position.z];
        }
        return defaultPosition;
    };

    const map = useMovements();

    return (
        <Suspense fallback={<LoadingScreen/>}>
            <KeyboardControls map={map}>
                <Canvas
                    /*    camera={
                           {
                               position: [0, 10, -2],
                               fov: 75
                           }
                       } */
                    shadows={true}
                >
                    {/*<Perf position="top-center"/>*/}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                    />
                    <Lights/>
                    <Environments/>
                    <Physics debug={true}>
                        <World/>
                        {/*{!isLoading && userData && (
                            <Wolverine position={getValidPosition(userData.positionLevel2)} />
                        )}
                        <Juggernaut />*/}
                        <Controls/>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </Suspense>
    )
}