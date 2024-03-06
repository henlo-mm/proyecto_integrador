import { Sphere } from '@react-three/drei';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SphereShape = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 2;
    });

    return (
        <Sphere ref={ref} args={[1, 32, 32]} position={[-4, 0, 0]}>
            <meshPhongMaterial attach="material" color="#EE82EE" shininess={10} />
        </Sphere>
    );
};


export default SphereShape;