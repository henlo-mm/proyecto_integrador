import {Box} from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const BoxShape = ({x, y, z}) => {
    const ref = useRef();

    useFrame(({clock}) => {
        const frecuencia = x * 0.1;
        ref.current.position.x = Math.sin(clock.getElapsedTime() * frecuencia) * 4.5;
    });

    return (
        <Box ref={ref} args={[1, 1, 1]} position={[x, y, z]}>
            <meshPhysicalMaterial attach="material" color="blue"/>
        </Box>
    );
};


export default BoxShape;