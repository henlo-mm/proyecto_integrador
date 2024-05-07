import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Health({ position, onCollected }) {
    const { nodes, materials } = useGLTF("assets/models/objects/first_aid_kit.glb");
    const groupRef = useRef();
    const collisionRef = useRef(false)

    const rigidBodyRef = useRef();

    const handleCollision = (event) => {
        if (!collisionRef.current) {
            collisionRef.current = true;
            onCollected();
        }
    };

    return (
        <RigidBody
            ref={rigidBodyRef}
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
