import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, LoopOnce } from "three";

import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useAvatar } from "../../../../context/AvatarContext";


export default function Juggernaut({ onCollision }, props) {
    const avatarRef = useRef();
    const { setAnimation } = useAvatar();

    const { nodes, materials, animations } = useGLTF("assets/models/enemies/JuggernautEnemy.glb");
    const { actions } = useAnimations(animations, avatarRef)

    const [isDead, setIsDead] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const rigidBodyRef = useRef();
    const [inCollision, setInCollision] = useState(false);

    let initialPosition = [2, -0.8, 30];
    const resetCollisionTimeout = 2000;
     
    useEffect(() => {
        if (actions.Swiping) {
            actions.Swiping.reset().fadeIn(0.2).play();
        }
    }, [actions]);

    useFrame(({ scene }) => {
        if (rigidBodyRef.current && !inCollision && !isDead) {
            const translation = rigidBodyRef.current.translation();
            let juggernautPosition = new Vector3(translation.x, translation.y, translation.z);

            
            const deadpool = scene.getObjectByName("Wolverine");
            if (deadpool) {
                let deadpoolPosition = new Vector3().setFromMatrixPosition(deadpool.matrixWorld);
                const distance = juggernautPosition.distanceTo(deadpoolPosition);

                if (distance < 1) {
                    setInCollision(true);
                    onCollision();
                    setTimeout(() => setInCollision(false), resetCollisionTimeout);
                }

                if (deadpoolPosition.z >= 10 && deadpoolPosition.z <= 30) {
                    if((juggernautPosition.x < deadpoolPosition.x) && (juggernautPosition.z < deadpoolPosition.z) ){
                        rigidBodyRef.current.setLinvel(
                            { x: 2, y: 0, z: 2 },true
                          )                       
                    }
                    else if((juggernautPosition.x < deadpoolPosition.x) && (juggernautPosition.z > deadpoolPosition.z)){
                        rigidBodyRef.current.setLinvel(
                        { x: 2, y: 0, z: -2 },true
                          )
                    }
                    else if((juggernautPosition.x > deadpoolPosition.x) && (juggernautPosition.z > deadpoolPosition.z)){
                        rigidBodyRef.current.setLinvel(
                        { x: -2, y: 0, z: -2 },true
                          )
                    }
                    else if((juggernautPosition.x > deadpoolPosition.x) && (juggernautPosition.z < deadpoolPosition.z)){
                        rigidBodyRef.current.setLinvel(
                        { x: -2, y: 0, z: 2 },true
                          )
                    }
                    
                    console.log(deadpoolPosition.z)

                }
                else {
                    rigidBodyRef.current.setLinvel({x: 0.0, y: 0.0, z:0.0}, true)
                }

                // Adjust rotation to look at Deadpool
                let lookAtPosition = new Vector3(deadpoolPosition.x, juggernautPosition.y, deadpoolPosition.z);
                avatarRef.current.lookAt(lookAtPosition);

            }

        }
    });

    // const movementDistance = 2;
    // const movementSpeed = 0.01;
    // const [direction, setDirection] = useState(1);

    // useFrame(({ clock }, delta) => {
    //     if (rigidBodyRef.current && !isDead) {
    //         const position = rigidBodyRef.current.translation();
    //         position.x += movementSpeed * direction;

    //         if (position.x > movementDistance || position.x < -movementDistance) {
    //             setDirection(-direction);
    //         }

    //         rigidBodyRef.current.setTranslation(position, true);
    //     }
    // });

    useEffect(() => {
        if (isDead && actions.Dying) {
            actions.Swiping.stop();
            actions.Dying.reset().setLoop(LoopOnce).play();
            actions.Dying.clampWhenFinished = true;
        }
    }, [isDead, actions.Dying]);

    const handleRightClick = () => {
        setAnimation("Shooting");
        if (!isDead) {
            const newCount = clickCount + 1;
            setClickCount(newCount);
            if (newCount >= 3) {
                setIsDead(true);
                if (actions.Dying) {
                    actions.Swiping.stop();
                    actions.Dying.reset().play();
                }
            }
        }
    };

    
    return (
        <RigidBody ref={rigidBodyRef} userData={{ name: "Juggernaut", rigidBody: rigidBodyRef, setIsDead  }} position={initialPosition} type="dynamic" onClick={handleRightClick} colliders={false}>
            

            <group ref={avatarRef} name="Juggernaut">
                <group name="Armature">
                    <skinnedMesh
                        name="EyeLeft"
                        geometry={nodes.EyeLeft.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeLeft.skeleton}
                    />
                    <skinnedMesh
                        name="EyeRight"
                        geometry={nodes.EyeRight.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeRight.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Head"
                        geometry={nodes.Wolf3D_Head.geometry}
                        material={materials.Wolf3D_Skin}
                        skeleton={nodes.Wolf3D_Head.skeleton}
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
                    />
                    <primitive object={nodes.Hips} />
                </group>
            </group>
        </RigidBody>

    )
}