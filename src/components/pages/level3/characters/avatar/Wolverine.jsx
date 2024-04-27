import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Wolverine() {
    const avatarRef = useRef();
    const rigidBodyAvatarRef = useRef();
    const { avatar, setAvatar } = useAvatar();

    const { nodes, materials, animations } = useGLTF("assets/models/avatar/WolverineAvatar.glb");
    const { gl } = useThree();

    const { actions } = useAnimations(animations, avatarRef)
    const [shootSound] = useState(new Audio("/assets/sounds/shoot.mp3"));


    const onMouseClick = useCallback(() => {
        if (actions.Shooting) {
            setAvatar({
                ...avatar,
                animation: "Shooting"
            });
            actions.Shooting.reset().fadeIn(0.05).setLoop(THREE.LoopOnce).play();

            shootSound.currentTime = 0;
            shootSound.play();
        }


    }, [actions, avatar, setAvatar]);

    useEffect(() => {
        gl.domElement.addEventListener('click', onMouseClick);
        return () => {
            gl.domElement.removeEventListener('click', onMouseClick);
        };
    }, [gl.domElement, onMouseClick]);

    useEffect(() => {

        actions[avatar.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[avatar.animation])
                actions[avatar.animation].fadeOut(0.5);
        }
    }, [actions, avatar.animation]);



    useEffect(() => {
        setAvatar({
            ...avatar,
            avatarRef: avatarRef,
            rigidBodyAvatarRef: rigidBodyAvatarRef?.current
        })
    }, [avatarRef?.current, rigidBodyAvatarRef?.current])

    return (
        <Ecctrl
            ref={rigidBodyAvatarRef}
            camInitDis={-2}
            camMaxDis={-2}
            maxVelLimit={5}
            jumpVel={5}
            position={[0, 10, 0]}
            animated
            mode="PointToMove"
        >

            <group ref={avatarRef} name="Scene" position-y={-0.8}>
                <group name="Scene">
                    <group name="Armature">
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
                            name="Wolf3D_Body"
                            geometry={nodes.Wolf3D_Body.geometry}
                            material={materials.Wolf3D_Body}
                            skeleton={nodes.Wolf3D_Body.skeleton}
                        />
                        <skinnedMesh
                            name="Wolf3D_Hair"
                            geometry={nodes.Wolf3D_Hair.geometry}
                            material={materials.Wolf3D_Hair}
                            skeleton={nodes.Wolf3D_Hair.skeleton}
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
            </group>

        </Ecctrl>
    )
}