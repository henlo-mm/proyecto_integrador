import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function CheckPoint({ onCollision }) {
    const checkPointRef = useRef();

    const { nodes, materials, animations } = useGLTF("assets/models/checkpoint/CheckPoint_unido.glb");

    const rigidBodyRef = useRef();
    const [inCollision, setInCollision] = useState(false);

    const initialPosition = [2, -0.5, 30];
    const resetCollisionTimeout = 2000;

    useFrame(({ scene }) => {

        if (rigidBodyRef.current && !inCollision) {
            const translation = rigidBodyRef.current.translation();
            const checkPointPosition = new Vector3(translation.x, translation.y, translation.z);

            const deadpool = scene.getObjectByName("Deadpool");
            if (deadpool) {
                const deadpoolPosition = new Vector3().setFromMatrixPosition(deadpool.matrixWorld);
                const distance = checkPointPosition.distanceTo(deadpoolPosition);

                if (distance < 1) {

                    setInCollision(true);
                    onCollision();
                    setTimeout(() => setInCollision(false), resetCollisionTimeout);
                }
            }
        }
    });

    const movementDistance = 2;
    const movementSpeed = 0.01;
    const [direction, setDirection] = useState(1);



    useFrame(() => {
        if (rigidBodyRef.current) {
            const position = rigidBodyRef.current.translation();
            position.x += movementSpeed * direction;

            if (position.x > movementDistance || position.x < -movementDistance) {
                setDirection(-direction);
            }

            rigidBodyRef.current.setTranslation(position, true);
        }
    });

    return (
        <RigidBody ref={rigidBodyRef} userData={{ name: "CheckPoint" }} position={initialPosition} type="fixed">
            <CuboidCollider args={[-0.4, 0.5, -0.2]} position={[0, 1, 5]} />

            <group ref={checkPointRef}>
                <group name="Armature">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['CheckPoint+'].geometry}
                        material={materials.dec}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['CheckPoint+_1'].geometry}
                        material={materials.base}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['CheckPoint+_2'].geometry}
                        material={materials.emiss}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['CheckPoint+_3'].geometry}
                        material={materials.screen}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['CheckPoint+_4'].geometry}
                        material={materials['emiss 2']}
                    />
                </group>
            </group>


        </RigidBody>
    )
}