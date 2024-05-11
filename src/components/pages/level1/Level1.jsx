import {Perf} from "r3f-perf";
import {Physics} from "@react-three/rapier";
import {Suspense, useEffect, useState} from "react";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import {Canvas} from "@react-three/fiber";
import World from "./world/World";
import useMovements from "../../utils/key-movements";
import {KeyboardControls} from "@react-three/drei";
import Deadpool from "./characters/avatar/Deadpool";
import Controls from "./controls/Controls";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";
import Health from "./objects/Health";
import {HealthHUD} from "./hud/HealthHUD";
import {useLives} from "../../context/LivesContext";
import {RewardHUD} from "./hud/RewardHUD";
import Logout from "../../logout/Logout";
import CheckPoint from "../../checkpoint/CheckPoint";
import { CheckpointMessage } from "../../html/CheckpointMessage";
import { useRewards } from "../../context/RewardsContext"; 
import { useUser  } from "../../context/UserContext"; 

export default function Level1() {


    const [activeHealths, setActiveHealths] = useState(() => {
        const savedHealths = localStorage.getItem('activeHealths');
        return savedHealths ? JSON.parse(savedHealths) : [true, true, true, true, true];
    });

    const {collectedLives, loseLife } = useLives();

    const { userData, isLoading } = useUser();

    const { increaseHealthCount, healthCount } = useRewards();

    const map = useMovements();
  

    const onHealthCollected = (index) => {
        increaseHealthCount();
        setActiveHealths(prev => {
            const newHealths = prev.map((isActive, idx) => {
                return idx === index ? false : isActive;
            });
            localStorage.setItem('activeHealths', JSON.stringify(newHealths));
            return newHealths;
        });
    };

    const handleCollisionWithJuggernaut = () => {
        loseLife();
    };

    const [colisiono, setColisiono] = useState(false);
    
    const handleCollisionWithCheckPoint = () => {
        setColisiono(true);
    };

    const getPositionForIndex = (index) => {
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
                <Logout/>
                <Canvas shadows={true}>
                    <Perf position="top-right"/>
                    <Lights/>
                    <Environments/>
                    <Physics debug={true}>
                        <World/>
                        {!isLoading && userData && (
                            <Deadpool position={[
                                userData.positionLevel1.x,
                                userData.positionLevel1.y,
                                userData.positionLevel1.z
                            ]}/>
                        )}

                        
                        <Juggernaut onCollision={handleCollisionWithJuggernaut}/>
                        <CheckPoint onCollision={handleCollisionWithCheckPoint}/>
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
                <HealthHUD collectedLives={collectedLives}/>
                <RewardHUD healthCount={healthCount}/>
                {colisiono &&
                   <CheckpointMessage />
                }
            </KeyboardControls>
        </Suspense>
    )
}