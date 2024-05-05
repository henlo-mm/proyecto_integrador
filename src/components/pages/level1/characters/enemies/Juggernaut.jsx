import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Juggernaut({ onCollision  }) {
    const avatarRef = useRef();

    const { nodes, materials, animations } = useGLTF("assets/models/enemies/JuggernautEnemy.glb");
    const { actions } = useAnimations(animations, avatarRef)


	const rigidBodyRef = useRef();
    const [inCollision, setInCollision] = useState(false);

    const initialPosition = [2, -0.5, 30];
    const resetCollisionTimeout = 2000; 

    useFrame(({ scene }) => {

        if (rigidBodyRef.current && !inCollision) {
            const translation = rigidBodyRef.current.translation();
            const juggernautPosition = new Vector3(translation.x, translation.y, translation.z);

            const deadpool = scene.getObjectByName("Deadpool");
            if (deadpool) {
                const deadpoolPosition = new Vector3().setFromMatrixPosition(deadpool.matrixWorld);
                const distance = juggernautPosition.distanceTo(deadpoolPosition);

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


    useEffect(() => {
        if (actions.Swiping) {
            actions.Swiping.reset().fadeIn(0.2).play();
        }
    }, [actions]);

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
        <RigidBody ref={rigidBodyRef}  userData={{ name: "Juggernaut" }} position={initialPosition} type="fixed">
            <CuboidCollider args={[-0.4, 0.5, -0.2]} position={[0, 1, 0]} /> 

            <group  ref={avatarRef} >
                <group name="Armature"  >
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