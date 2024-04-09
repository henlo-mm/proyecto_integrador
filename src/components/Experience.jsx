import { BakeShadows, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import { Suspense, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import Environments from "./environments/Environments";
import Lights from "./lights/Lights";
import WelcomeText from "./world/WelcomeText";
import GameText from "./world/GameText";
import { Canvas, useFrame } from "@react-three/fiber";
import GameStats from "./html/GameStats";
import { AnyCollider, BallCollider, Physics, RigidBody, vec3 } from "@react-three/rapier";



const Experience = () => {

    const cameraBodyCollider = useRef();

    useFrame(({camera}, delta)=>{
        const position = vec3(camera.position);
        cameraBodyCollider.current?.setTranslation(position, true);
        console.log(cameraBodyCollider?.current?.translation());
    })

    const [isGameStatsVisible, setGameTextVisible] = useState(false);
    const [isWelcomeTextVisible, setWelcomeTextVisible] = useState(true);

    const handleText = () => {
        setGameTextVisible(true);
        setWelcomeTextVisible(false);
    };

    return (
        <>
          
            <Perf position="top-right" />
            <BakeShadows />
            <OrbitControls makeDefault /*target={[48, 2, -8]}*//>

            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <Physics debug={true}>
                    
                    {isWelcomeTextVisible && <WelcomeText  position={[49, 3, -8]} rotation={[0, Math.PI / 2, 0]} onClick={handleText} /> }
                    <World />
                </Physics>
            </Suspense>
           
           

            
        </>

    )
}

export default Experience;