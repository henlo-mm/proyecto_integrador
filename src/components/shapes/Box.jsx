import { Box  } from '@react-three/drei';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const BoxShape = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
        ref.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 3;
      });

    return (
        <Box  ref={ref} args={[1, 1, 1]} position={[2, 0.5, 0]}>
            <meshPhysicalMaterial attach="material" color="blue" />
        </Box >
    );
};


export default BoxShape;