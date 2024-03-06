import {Cylinder} from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const CylinderShape = ({x, y, z}) => {
    const ref = useRef();

    useFrame(({clock}) => {
        /* ref.current.position.z = clock.getElapsedTime(); */
        /* ref.current.position.z = Math.sin(clock.getElapsedTime()) */
        const frecuenciaZ = z * 10;
        const frecuenciaX = x * 10;

        ref.current.position.z = z+Math.cos(clock.getElapsedTime() * frecuenciaZ) * 4.5;
        ref.current.position.x = Math.cos(clock.getElapsedTime() * frecuenciaX) * 4.5;
    });

    const toon = {
        color: "#ff00ff",
    };

    return (
        <Cylinder ref={ref} args={[0.5, 0.5, 2, 32]} position={[x, y, z]}>
            <meshToonMaterial attach="material" {...toon} />
        </Cylinder>
    );
};


export default CylinderShape;