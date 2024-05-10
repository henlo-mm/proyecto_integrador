import {useEffect, useRef, useState} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";

import {CuboidCollider, RigidBody} from "@react-three/rapier";

export default function CheckPoint({onCollision}) {
    const checkPointRef = useRef();
    const rigidBodyRef = useRef();

    const [inCollision, setInCollision] = useState(false);

    const {nodes, materials} = useGLTF("assets/models/checkpoint/CheckPoint_unido.glb");

    const initialPosition = [0, -0.5, 0];

    useFrame(({scene}) => {
        if (rigidBodyRef.current && !inCollision) {
            const translation = rigidBodyRef.current.translation();
            const checkPointPosition = new Vector3(translation.x, translation.y, translation.z);

            const deadpool = scene.getObjectByName("Deadpool");
            if (deadpool) {
                const deadpoolPosition = new Vector3().setFromMatrixPosition(deadpool.matrixWorld);
                const distance = checkPointPosition.distanceTo(deadpoolPosition);

                if (distance < 1) {
                    setInCollision(true);
                    console.log("Collision detected at position:", checkPointPosition.toArray());
                    onCollision();
                }
            }
        }
    });

    // Restablecer el estado de inCollision cuando la colisión ha terminado
    useEffect(() => {
        let collisionTimeout;
        if (inCollision) {
            collisionTimeout = setTimeout(() => {
                setInCollision(false);
            }, 2000); // Esperar 2 segundos después de que la colisión haya terminado
        }

        return () => {
            clearTimeout(collisionTimeout);
        };
    }, [inCollision]);

    return (
        <RigidBody ref={rigidBodyRef} userData={{name: "CheckPoint"}} position={initialPosition} type="fixed"
                   colliders={false}>
            <CuboidCollider args={[-0.4, 0.8, -0.2]} position={[0, 0.5, 0]}/>

            <group ref={checkPointRef} scale={[0.2, 0.2, 0.2]}>
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