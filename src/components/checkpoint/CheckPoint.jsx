import {useEffect, useRef, useState} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";
import { updateUser } from "../../db/users-collection";
import { useLives } from "../context/LivesContext";
import {useLocation} from "react-router-dom";

import { RigidBody} from "@react-three/rapier";
import { useRewards } from "../context/RewardsContext";

export default function CheckPoint({onCollision}) {
    const checkPointRef = useRef();
    const rigidBodyRef = useRef();

    const location = useLocation();
    const userData = location.state.userData;
    const { collectedLives } = useLives();
    const { collectedRewards} = useRewards();

    const [inCollision, setInCollision] = useState(false);

    const {nodes, materials} = useGLTF("assets/models/checkpoint/CheckPoint_unido.glb");

    const initialPosition = [-4, -0.9, 0];

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
                    onCollision();

                    userData.checkPoint1 = true;
                    const adjustedPosition = deadpoolPosition.add(new Vector3(0, 10, 2));

                    userData.positionLevel1 = {
                        x: parseFloat(adjustedPosition.x.toFixed(2)),
                        y: parseFloat(adjustedPosition.y.toFixed(2)),
                        z: parseFloat(adjustedPosition.z.toFixed(2))
                    };

                    userData.vidas = collectedLives;

                    userData.coleccion = collectedRewards;

                    console.log('userData: ', userData);
                    updateUser(userData.email, userData);

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
        <RigidBody ref={rigidBodyRef} userData={{name: "CheckPoint"}} position={initialPosition} type="fixed" colliders="cuboid">

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