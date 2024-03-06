import { Cylinder } from '@react-three/drei';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const CylinderShape = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
        /* ref.current.position.z = clock.getElapsedTime(); */
        /* ref.current.position.z = Math.sin(clock.getElapsedTime()) */
        
        ref.current.position.z = Math.cos(clock.getElapsedTime() * 0.7) * 3;
    });

    const toon = {
        color: "#ff00ff",
    };

    return (
        <Cylinder ref={ref} args={[0.5, 0.5, 2, 32]} position={[4, 0.5, 0]}>
            <meshToonMaterial attach="material" {...toon} />

        </Cylinder>
    );
};


export default CylinderShape;