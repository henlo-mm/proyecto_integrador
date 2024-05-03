import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

export default function Health({ position, onCollected }) {
    const { nodes, materials } = useGLTF("assets/models/objects/first_aid_kit.glb");
    const groupRef = useRef();

    // Función de colisión
    const handleCollision = (event) => {
        onCollected();
    };

    useFrame(({clock}) => {

        const rotationSpeed = 2; 
        const elapsed = clock.getElapsedTime();
    
        groupRef.current.rotation.y = elapsed * rotationSpeed;
    })


    return (
        <RigidBody
            colliders="trimesh"
            type='fixed'
            onCollisionEnter={handleCollision}
        >
            <group dispose={null} scale={[-0.1, -0.1, -0.1]} position={position} ref={groupRef}>
                <group>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Object_2.geometry}
                            material={materials.Material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Object_3.geometry}
                            material={materials['Material.001']}
                        />
                    </group>
                </group>
            </group>
        </RigidBody>
    )
}
