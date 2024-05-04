import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Juggernaut({ targetRef, onCollisionWithTarget  }) {
    const avatarRef = useRef();
    
    const { nodes, materials, animations } = useGLTF("assets/models/enemies/JuggernautEnemy.glb");
    const { actions } = useAnimations(animations, avatarRef)

    const [shouldMove, setShouldMove] = useState(false);
    const [initialPosition, setInitialPosition] = useState(new THREE.Vector3());
    const [startMoving, setStartMoving] = useState(false);

    const movementThreshold = 5; // Umbral de movimiento en unidades
    const startDelay = 2000; // Tiempo de retraso antes de que el Juggernaut comience a moverse (en milisegundos)

    useEffect(() => {
        avatarRef.current.position.set(-15, -0.8, 5);

        if (targetRef.current) {
            setInitialPosition(new THREE.Vector3().setFromMatrixPosition(targetRef.current.matrixWorld));
        }

        const delayTimer = setTimeout(() => {
            setStartMoving(true);
        }, startDelay);

        return () => clearTimeout(delayTimer);
    }, [targetRef]);

    useEffect(() => {
        // Comprueba el movimiento de Deadpool cada 500 ms
        const interval = setInterval(() => {
            if (targetRef.current && startMoving) {
                const currentPosition = new THREE.Vector3().setFromMatrixPosition(targetRef.current.matrixWorld);
                const distanceMoved = currentPosition.distanceTo(initialPosition);

                if (distanceMoved > movementThreshold) {
                    setShouldMove(true);
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [initialPosition, startMoving]);

    useFrame(() => {
        if (shouldMove && targetRef && targetRef.current) {
            const targetPosition = new THREE.Vector3().setFromMatrixPosition(targetRef.current.matrixWorld);
            const currentPosition = avatarRef.current.position;

            const distance = targetPosition.distanceTo(currentPosition);
            if (distance < 1) return;

            const direction = targetPosition.clone().sub(currentPosition).normalize();
            avatarRef.current.lookAt(targetPosition);

            const speed = 0.005; // Velocidad reducida
            avatarRef.current.position.add(direction.multiplyScalar(speed));
        }
    });
    
    useEffect(() => {
        if (actions["Walking"] && actions["Swiping"]) {
            actions["Walking"].reset().fadeIn(0.5).play();
            actions["Swiping"].reset().fadeIn(0.5).play();
        }
    }, [actions]);

    const handleCollision = (event) => {
        const collidedBody = event.collider;
        if (targetRef.current && collidedBody.rigidBodyHandle === targetRef.current.rigidBodyHandle) {
            onCollisionWithTarget();
        }          
    };

    return (
        <RigidBody colliders="cuboid" type='dynamic'  onCollisionEnter={handleCollision} >

            <group name="Scene" ref={avatarRef} >
                <group name="Armature" position-y={-0.8} position-x={-15} position-z={5} rotation={[0, Math.PI / 2, 0]}>
                    <skinnedMesh
                        name="EyeLeft"
                        geometry={nodes.EyeLeft.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeLeft.skeleton}
                        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="EyeRight"
                        geometry={nodes.EyeRight.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeRight.skeleton}
                        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="Wolf3D_Head"
                        geometry={nodes.Wolf3D_Head.geometry}
                        material={materials.Wolf3D_Skin}
                        skeleton={nodes.Wolf3D_Head.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Bottom"
                        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                        material={materials.Wolf3D_Outfit_Bottom}
                        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Footwear"
                        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                        material={materials.Wolf3D_Outfit_Footwear}
                        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Top"
                        geometry={nodes.Wolf3D_Outfit_Top.geometry}
                        material={materials.Wolf3D_Outfit_Top}
                        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Teeth"
                        geometry={nodes.Wolf3D_Teeth.geometry}
                        material={materials.Wolf3D_Teeth}
                        skeleton={nodes.Wolf3D_Teeth.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                    />
                    <primitive object={nodes.Hips} />
                </group>
            </group>

        </RigidBody>
    )
}