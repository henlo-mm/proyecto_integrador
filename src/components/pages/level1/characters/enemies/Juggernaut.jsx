import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export default function Juggernaut({ targetRef, onCollisionWithTarget  }) {
    const avatarRef = useRef();
    
    const { nodes, materials, animations } = useGLTF("assets/models/enemies/JuggernautEnemy.glb");
    const { actions } = useAnimations(animations, avatarRef)

    useFrame(() => {
        if (targetRef.current) {
            const targetPosition = new THREE.Vector3().setFromMatrixPosition(targetRef.current.matrixWorld);
            const currentPosition = avatarRef.current.position;
            const distance = targetPosition.distanceTo(currentPosition);

            const minDistance = 1.0;
            const speed = 0.05;

            if (distance > minDistance) {
                const direction = targetPosition.clone().sub(currentPosition).normalize();

                avatarRef.current.lookAt(targetPosition);
                avatarRef.current.position.add(direction.multiplyScalar(speed));

            }
        }
    });
    

    useEffect(() => {
        actions["Walking"]?.reset().fadeIn(0.5).play();
    }, [actions]);

    const handleCollision = (event) => {
        const { other } = event;
        if (other) {
            onCollisionWithTarget();
        }
    };

    return (
        
        <RigidBody colliders="cuboid"  type="dynamic" onCollisionEnter={handleCollision} >
            <group name="Scene" ref={avatarRef}>
                <group name="Armature" position-y={-0.8} position-x={-15} position-z={5} >
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