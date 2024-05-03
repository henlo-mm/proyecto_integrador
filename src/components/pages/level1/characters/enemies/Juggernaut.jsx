import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Juggernaut(props, deadpoolRef) {

    const JuggernautCircleRef = useRef(null)
    const { nodes, materials,animations } = useGLTF("assets/models/enemies/JuggernautEnemy.glb");
    
    const { actions } = useAnimations(animations, JuggernautCircleRef)
    const { avatar, setAvatar } = useAvatar();

    const radius = 3.5
    const speed = 0.5

    useFrame((state, delta) => {
        const elapsedTime = state.clock.getElapsedTime()
        const angle = elapsedTime * speed
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        JuggernautCircleRef.current.position.set(props.position[0] + x, props.position[1], props.position[2] + z)
        JuggernautCircleRef.current.rotation.y = -angle
    })

    //
    
    useEffect(() => {

        JuggernautCircleRef.animation = 'Walking'

        actions[JuggernautCircleRef.animation]?.reset().fadeIn(1).play();
        return () => {
          if (actions[JuggernautCircleRef.animation])
            actions[JuggernautCircleRef.animation].fadeOut(0.5);
        }
      }, [actions, JuggernautCircleRef.animation]);
    
    







    return (
        <RigidBody colliders={false} type='fixed' >

            <group name="Scene">
                <group  name="Armature" ref={JuggernautCircleRef}  position-y={-0.8} position-x={-15} position-z={5} >
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