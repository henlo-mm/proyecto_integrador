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
import { GameOverScreen } from "../../html/GameOverMessage";
import { updateUser } from "../../../db/users-collection";
import { LevelCompletedMessage } from "../../html/LevelCompleteMessage";

export default function Level1() {


    const [activeHealths, setActiveHealths] = useState(() => {
        const savedHealths = localStorage.getItem('activeHealths');
        return savedHealths ? JSON.parse(savedHealths) : [true, true, true, true, true];
    });

    const {collectedLives, loseLife } = useLives();

    const { userData, isLoading } = useUser();

    const { increaseHealthCount, healthCount } = useRewards();
    const [showLevelCompleted, setShowLevelCompleted] = useState(false);


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
    
    const handleCollisionWithCheckPoint = (checkpointId) => {
        if (checkpointId === 1) {
            setColisiono(true);
            setTimeout(() => {
                setColisiono(false);
            }, 3000);
        } else if (checkpointId === 2) {

            setColisiono(true);
            setTimeout(() => {
                setColisiono(false);
            }, 2000);

            userData.level2 = true;

            updateUser(userData.email, userData).then(() => {
                setTimeout(() => {
                    setShowLevelCompleted(true); 
                }, 3000);
                
            }).catch((error) => console.error(error));
        }
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

    const handleRestartLevel = () => {

        userData.positionLevel1.x = 2;
        userData.positionLevel1.y = 10;
        userData.positionLevel1.z = 48;
        userData.checkPoint1 = true;
        userData.coleccion = 0;
        userData.vidas = 3;
       
        updateUser(userData.email, userData);
        window.location.reload();
    };

    const handleContinueFromCheckpoint = () => {
        window.location.reload();
    };

    return (
        <Suspense fallback={<LoadingScreen/>}>
            <KeyboardControls map={map}>
                <Logout/>
                <Canvas shadows={true}>
                   {/*  <Perf position="top-center"/> */}
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
                        <CheckPoint onCollision={() => handleCollisionWithCheckPoint(1)} position={[-4, -0.9, 25]} />
                        <CheckPoint onCollision={() => handleCollisionWithCheckPoint(2)} position={[-4, -0.9, -49]} />
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
                {collectedLives === 0 &&
                    <GameOverScreen
                        onRestart={handleRestartLevel}
                        onContinue={handleContinueFromCheckpoint}
                    /> 
                }
                {showLevelCompleted && <LevelCompletedMessage />}

            </KeyboardControls>
        </Suspense>
    )
}