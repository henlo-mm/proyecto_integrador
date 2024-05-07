import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useState } from "react";

export default function Controls() {
	const { avatar, setAvatar } = useAvatar();
	const [sub, get] = useKeyboardControls()
	const [runSound] = useState(new Audio("/assets/sounds/run.mp3"))
	const [walkSound] = useState(new Audio("/assets/sounds/walk.mp3"));
	const [jumpSound] = useState(new Audio("/assets/sounds/jump.wav"));
	const [punchSound] = useState(new Audio("/assets/sounds/punch.mp3"));
	const [shootSound] = useState(new Audio("/assets/sounds/shoot.mp3"));

	const [currentSound, setCurrentSound] = useState(null);
    const [soundReady, setSoundReady] = useState(true);

	useEffect(() => {
        const unsubscribe = sub(
            (state) => state,
            (state) => {
                let currentAnimation = "Idle";
                let soundToPlay = null;

                if (state.forward || state.backward || state.leftward || state.rightward) {
                    currentAnimation = state.run ? "Running" : "Walking";
                    soundToPlay = state.run ? runSound : walkSound;
                }
                if (state.jump) {
                    currentAnimation = "Jump";
                    soundToPlay = jumpSound;
                }
                if (state.attack) {
                    currentAnimation = state.shoot ? "Shoot" : "Punch";
                    soundToPlay = state.shoot ? shootSound : punchSound;
                }

                setAvatar({ ...avatar, animation: currentAnimation });
                manageSound(soundToPlay);
            }
        );

        return () => unsubscribe();
    }, [avatar, setAvatar, sub, runSound, walkSound, jumpSound, punchSound, shootSound]);

	const manageSound = (soundToPlay) => {
        if (currentSound && currentSound !== soundToPlay && soundReady) {
            setSoundReady(false);
            currentSound.pause();
            currentSound.onpause = () => {
                currentSound.currentTime = 0;
                setSoundReady(true);
                playSound(soundToPlay);
            };
        } else if (soundReady) {
            playSound(soundToPlay);
        }
    };

    const playSound = (sound) => {
        setCurrentSound(sound);
        if (sound) {
            sound.play().catch(error => console.error("Error playing the sound:", error));
        }
    };
}