import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Controls() {
    const { avatar, setAvatar } = useAvatar();
    const [sub, get] = useKeyboardControls();
    const sounds = useRef({
        run: new Audio("/assets/sounds/run.mp3"),
        walk: new Audio("/assets/sounds/walk.mp3"),
        jump: new Audio("/assets/sounds/jump.wav"),
        punch: new Audio("/assets/sounds/punch.mp3"),
        shoot: new Audio("/assets/sounds/shoot.mp3"),
    });

    const [play, setPlay] = useState(false);

    useEffect(() => {
        sounds.current.run.preload = "auto";
        sounds.current.run.load();

        const unsubscribe = sub(
            (state) => {
                let currentAnimation = "Idle";
                let soundToPlay = null;

                if (state.forward || state.backward || state.leftward || state.rightward) {
                    currentAnimation = state.run ? "Running" : "Walking";
                    soundToPlay = state.run ? sounds.current.run : sounds.current.walk;
                }
                if (state.jump) {
                    currentAnimation = "Jumping";
                    soundToPlay = sounds.current.jump;
                }
                if (state.attack) {
                    currentAnimation = state.shoot ? "Shooting" : "Punching";
                    soundToPlay = state.shoot ? sounds.current.shoot : sounds.current.punch;
                }

                setAvatar({ ...avatar, animation: currentAnimation });
                manageSound(soundToPlay);
            }
        );

        return () => {
            unsubscribe();
            Object.values(sounds.current).forEach(sound => {
                sound.pause();
                sound.src = "";  
                sound = null;
            });
        };
    }, [avatar, setAvatar, sub]);

    useEffect(() => {
        if (play) {
            sounds.current.run.currentTime = 0;
            sounds.current.run.play();
        } else {
            sounds.current.run.pause();
        }
    }, [play]);

    useFrame(() => {
        const { forward, backward, leftward, rightward } = get();
        setPlay(forward || backward || leftward || rightward);
    });

    const manageSound = (soundToPlay) => {
        if (soundToPlay && soundToPlay.paused) {
            soundToPlay.play().catch(error => console.error("Error playing the sound:", error));
        }
    };

    return null;  

}
