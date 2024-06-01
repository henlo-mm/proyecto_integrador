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
import {HealthHUD} from "../../html/hud/HealthHUD";
import {useLives} from "../../context/LivesContext";
import {RewardHUD} from "../../html/hud/RewardHUD";
import LoadingScreen from "../../loading/LoadingScreen";
import Juggernaut from "./characters/enemies/Juggernaut";
import CheckPoint from "../../checkpoint/CheckPoint";
import {updateUser} from "../../../db/users-collection";
import {useUser} from "../../context/UserContext";
import {useRewards} from "../../context/RewardsContext";
import Health from "./objects/Health";
import {CheckpointMessage} from "../../html/CheckpointMessage";
import {GameOverScreen} from "../../html/GameOverMessage";
import {LevelCompletedMessage} from "../../html/LevelCompleteMessage";
import mainSong from '../../sounds/wolverine_game_sound.mp3';
import Music from "../../music/Music";
import MusicControls from "../../music/MusicControls";
import ControlsCard from "../../html/ControlsCard";
import { CollectHealthsMessage } from "../../html/CollectHealthsMessage";
import { LevelIncompleteMessage } from "../../html/LevelIncompleteMessage";

export default function Level2() {


    const defaultPosition = [0, 10, -65];
    const {increaseHealthCount, healthCount} = useRewards();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [showLevelCompleted, setShowLevelCompleted] = useState(false);
    const [showLevelIncomplete, setShowLevelIncomplete] = useState(false); 
    const [colisiono, setColisiono] = useState(false);

    const {userData, isLoading} = useUser();

    const {collectedLives, loseLife} = useLives();

    const [activeHealths, setActiveHealths] = useState(() => {

        const savedHealths = localStorage.getItem('activeHealthsLevel2');
        console.log("activeHealthsLevel2", savedHealths);
        return savedHealths ? JSON.parse(savedHealths) : [true, true, true, true,/*  true, true */];
    });

    const onHealthCollectedLevel2 = (index) => {
        increaseHealthCount();
        setActiveHealths(prev => {
            const newHealths = prev.map((isActive, idx) => {
                return idx === index ? false : isActive;
            });
            localStorage.setItem('activeHealthsLevel2', JSON.stringify(newHealths));
            return newHealths;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const getPositionForIndex = (index) => {
        const positions = [
            [14.3, 3, 13],
            [-14.5, 3, 32.5],
            [-8, 0.5, 40],
            [-2, 0.5, 50],
        ];
        return positions[index] || [0, 0, 0];
    }

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

            userData.level3 = true;

            updateUser(userData.email, userData).then(() => {
                setTimeout(() => {
                    setShowLevelCompleted(true);
                }, 3000);

            }).catch((error) => console.error(error));
         
        }
    };

    const handleCollisionWithJuggernaut = () => {
        loseLife();
    };

    const handleCollision = () => {
        loseLife();
    };

    const getValidPosition = (position) => {

        if (position && !isNaN(position.x) && !isNaN(position.y) && !isNaN(position.z)) {

            return [position.x, position.y, position.z];
        }
        return defaultPosition;
    };

    const handleRestartLevel = async () => {

        userData.positionLevel2.x = 0;
        userData.positionLevel2.y = 10;
        userData.positionLevel2.z = -65;
        userData.checkPoint2 = true;
        userData.coleccion = 0;
        userData.vidas = 3;

        await updateUser(userData.email, userData);
        localStorage.removeItem('activeHealthsLevel2');
        window.location.reload();
    };

    const handleContinueFromCheckpoint = () => {
        window.location.reload();
    };

    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMuteToggle = () => setIsMuted(!isMuted);
    const handleVolumeChange = (e) => setVolume(e.target.value);
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
                   {/*  <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                    /> */}

                    <Lights/>
                    <Environments/>
                    <Physics debug={false}>
                        <World handleCollisionWithObject={handleCollision}/>
                        {!isLoading && userData && (
                            <Wolverine position={getValidPosition(userData.positionLevel2)}/>
                        )}
                        <Juggernaut onCollision={handleCollisionWithJuggernaut}/>

                        <CheckPoint onCollision={() => handleCollisionWithCheckPoint(1)} position={[14, -0.9, 0]}
                                    level="2"/>
                        <CheckPoint onCollision={() => handleCollisionWithCheckPoint(2)} position={[14.5, -0.9, 65]}
                                    level="2"/>
                        {activeHealths.map((isActive, index) => isActive && (
                            <Health
                                key={index}
                                position={getPositionForIndex(index)}
                                onCollected={() => {
                                    onHealthCollectedLevel2(index);
                                }}
                            />
                        ))}
                        <Controls/>
                        <Music
                            track={mainSong}
                            volume={volume}
                            isMuted={isMuted}
                            autoPlay={true}
                            onPlay={() => setIsPlaying(true)}
                            onStop={() => setIsPlaying(false)}
                        />

                    </Physics>
                </Canvas>
                <HealthHUD collectedLives={collectedLives}/>
                <RewardHUD healthCount={healthCount}/>

                <MusicControls
                    onMuteToggle={handleMuteToggle}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                />

                {colisiono &&
                    <CheckpointMessage/>
                }
                {collectedLives === 0 &&
                    <GameOverScreen
                        onRestart={handleRestartLevel}
                        onContinue={handleContinueFromCheckpoint}
                    />
                }
                {showLevelCompleted && <LevelCompletedMessage/>}
                {showLevelIncomplete && <LevelIncompleteMessage onClose={() => setShowLevelIncomplete(false)}/>} 
                <CollectHealthsMessage />
                <ControlsCard movements={map} />

            </KeyboardControls>
        </Suspense>
    )
}