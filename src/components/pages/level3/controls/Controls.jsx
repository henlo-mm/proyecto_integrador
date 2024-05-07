import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useState, useMemo } from "react";

export default function Controls() {
    const { avatar, setAvatar } = useAvatar();
    const [sub] = useKeyboardControls();

    const sounds = useMemo(() => ({
        run: new Audio("/assets/sounds/run.mp3"),
        walk: new Audio("/assets/sounds/walk.mp3"),
        jump: new Audio("/assets/sounds/jump.wav"),
        punch: new Audio("/assets/sounds/punch.mp3"),
        shoot: new Audio("/assets/sounds/shoot.mp3"),
    }), []);

    const [currentSound, setCurrentSound] = useState(null);

    useEffect(() => {
        const unsubscribe = sub(
            (state) => state,
            (state) => {
                let currentAnimation = "Idle";
                let soundToPlay = null;

                if (state.forward || state.backward || state.leftward || state.rightward) {
                    currentAnimation = state.run ? "Running" : "Walking";
                    soundToPlay = state.run ? sounds.run : sounds.walk;
                }
                if (state.jump) {
                    currentAnimation = "Jumping";
                    soundToPlay = sounds.jump;
                }
                if (state.attack) {
                    currentAnimation = state.shoot ? "Shooting" : "Punch";
                    soundToPlay = state.shoot ? sounds.shoot : sounds.punch;
                }

                setAvatar({ ...avatar, animation: currentAnimation });
                manageSound(soundToPlay);
            }
        );

        return () => {
            unsubscribe();
            Object.values(sounds).forEach(sound => {
                sound.pause();
                sound.src = "";
            });
        };
    }, [avatar, setAvatar, sub, sounds]);

    const manageSound = (soundToPlay) => {
        if (currentSound !== soundToPlay) {
            if (currentSound) {
                currentSound.pause();
                currentSound.currentTime = 0;
            }
            setCurrentSound(soundToPlay);
            if (soundToPlay) {
                soundToPlay.play().catch(error => console.error("Error playing the sound:", error));
            }
        }
    };
}
