import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Controls() {
  const { avatar, setAvatar } = useAvatar();
  const [sub, get] = useKeyboardControls()
  const [play, setPlay] = useState(false)


  useEffect(() => {
    const unsubscribe = sub(
        (state) => state,
        (state) => {
            if (state.forward || state.backward || state.leftward || state.rightward) {
                setAvatar({ ...avatar, animation: "Walking"});
            } else if (state.jump) {
                setAvatar({ ...avatar, animation:  "Jump" });
            } else if (state.run) {
                setAvatar({ ...avatar, animation:  "Running" });
            } else if (state.attack) {
                setAvatar({ ...avatar, animation:  "Punch" });
            } else {
                setAvatar({ ...avatar, animation: "Idle" });
            }
        }
    );
    return () => unsubscribe();
  }, [avatar, setAvatar, sub, get]);


  useFrame(() => {
    const { forward, backward, leftward, rightward, jump, run, attack} = get()
    if (!(forward || backward || leftward || rightward || jump || run || attack)) {
        setAvatar({ ...avatar, animation: "Idle" });
    }
  })
}