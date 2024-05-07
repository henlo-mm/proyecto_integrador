import {Perf} from "r3f-perf";
import {Physics} from "@react-three/rapier";
import {Suspense, useState} from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import {Canvas} from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import {KeyboardControls } from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";
import Health from "./objects/Health";
import {HealthHUD} from "./hud/HealthHUD";
import { useLives } from "../../context/LivesContext";
import { RewardHUD } from "./hud/RewardHUD";

export default function Level1() {

    const [activeHealths, setActiveHealths] = useState([true, true, true, true, true]);
    const [healthCount, setHealthCount] = useState(0);

    const { collectedLives, loseLife, gainLife } = useLives();


    const map = useMovements();

    const onHealthCollected = (index) => {

        setHealthCount(prev => {
            const newCount = prev + 1;

            if (newCount >= 4) {
                gainLife();  
                return 0;  
            }
            return newCount;
        });

        //Desaparece el objeto de salud cada que colisiona con el avatar
        setActiveHealths(prev => {
            return prev.map((isActive, idx) => {
                return idx === index ? false : isActive;
            });
        });
    };

    //Cada que colisiona con el enemigo quita una vida
    const handleCollisionWithJuggernaut = () => {
        loseLife();
    };

    //Posiciones de los objetos de salud
    const getPositionForIndex = (index)  => {
        const positions = [
            [-0.8, 0.5, 22.2],
            [-3, 0.5, 10],
            [3.5, 0.5, 0.2],
            [2, 0.5, -11.3],
            [0.7, 1.5, 0.8]
        ];
        return positions[index] || [0, 0, 0];
    }

    return (
        <Suspense fallback={<LoadingScreen/>}>
            <KeyboardControls map={map}>
                <Canvas
                    shadows={true}
                >
                    <Perf position="top-right"/>
                    <Lights/>
                    <Environments/>
                    <Physics debug={true}>
                        <World/>
                        <Deadpool onCollision={handleCollisionWithJuggernaut}/>
                        <Juggernaut onCollision={handleCollisionWithJuggernaut} />
                        {activeHealths.map((isActive, index) => isActive && (
                            <Health
                                key={index}
                                position={getPositionForIndex(index)}
                                onCollected={() => onHealthCollected(index)}
                            />
                        ))}

                        <Controls/>
                    </Physics>

                </Canvas>
                <HealthHUD collectedLives={collectedLives} />
                <RewardHUD healthCount={healthCount} />

            </KeyboardControls>
        </Suspense>

    )
}