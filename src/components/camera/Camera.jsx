import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from "three";

const Camera = ({ targetRef }) => {
    const cameraRef = useRef();

    useFrame(() => {
        if (cameraRef.current && targetRef.current) {
            const { position } = targetRef.current;
            cameraRef.current.position.lerp(position.clone().add(new THREE.Vector3(0, 5, 10)), 0.05);
            cameraRef.current.lookAt(position);
        }
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 20]} />
            <OrbitControls enableZoom={true} enablePan={true} />
        </>
    );
};

export default Camera;