import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Controls() {
  const { avatar, setAvatar } = useAvatar();
  const [sub, get] = useKeyboardControls()
  const [runSound] = useState(new Audio("/assets/sounds/run.mp3"))
  const [walkSound] = useState(new Audio("/assets/sounds/walk.mp3"));
  const [jumpSound] = useState(new Audio("/assets/sounds/jump.wav"));
  const [punchSound] = useState(new Audio("/assets/sounds/punch.mp3"));
  const [shootSound] = useState(new Audio("/assets/sounds/shoot.mp3"));
  
  const [play, setPlay] = useState(false)
  const [currentSound, setCurrentSound] = useState(null);


  
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
    if (currentSound !== soundToPlay) {
      if (currentSound) {
        const pausePromise = currentSound.play(); 
        pausePromise.then(() => {
          currentSound.pause();
          currentSound.currentTime = 0;
        }).catch(error => console.error("Error pausing the current sound:", error));
      }
      setCurrentSound(soundToPlay);
      if (soundToPlay) {
        const playPromise = soundToPlay.play();
        playPromise.catch(error => console.error("Error playing the sound:", error));
      }
    }
  };
  
 
  


}