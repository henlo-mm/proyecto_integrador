import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

export default function Health({ position, onCollected }) {
    const { nodes, materials } = useGLTF("assets/models/objects/first_aid_kit.glb");
    const groupRef = useRef();
    const collisionRef = useRef(false);

    const handleCollision = (event) => {
        console.log('collision', event)
        if (!collisionRef.current) {
            collisionRef.current = true;
            onCollected();
        }
    };

/*     useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        groupRef.current.rotation.y = elapsed * 2;
    }); */


    return (
        <RigidBody
            colliders="cuboid"
            type='fixed'
            onCollisionEnter={handleCollision}
        >
            <group dispose={null} scale={[-0.09, -0.09, -0.09]} position={position} ref={groupRef}>
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
