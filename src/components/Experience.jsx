import { BakeShadows, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import { Suspense, useState } from "react";
import { Perf } from "r3f-perf";
import Environments from "./environments/Environments";
import Lights from "./lights/Lights";
import WelcomeText from "./world/WelcomeText";
import GameText from "./world/GameText";
import { Canvas } from "@react-three/fiber";
import GameStats from "./html/GameStats";


const Experience = () => {

    const [isGameStatsVisible, setGameTextVisible] = useState(false);
    const [isWelcomeTextVisible, setWelcomeTextVisible] = useState(true);

    const handleText = () => {
        setGameTextVisible(true);
        setWelcomeTextVisible(false);
    };

    return (
        <>
            <Canvas
                camera={
                    {
                        position: [55, 5, -10],
                        fov: 75
                    }
                }
                shadows={true}
            >
                  <Perf position="top-right" />
                    <BakeShadows />
                    <OrbitControls makeDefault /*target={[48, 2, -8]}*//>

                    <Suspense fallback={null}>
                        <Lights />
                        <Environments />
                        {isWelcomeTextVisible && <WelcomeText  position={[49, 3, -8]} rotation={[0, Math.PI / 2, 0]} onClick={handleText} /> }
                        <World />
                    </Suspense>
            </Canvas>
          
            {isGameStatsVisible && <GameStats /> }

            
        </>

    )
}

export default Experience;