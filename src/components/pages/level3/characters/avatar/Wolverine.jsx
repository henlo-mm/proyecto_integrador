import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import { useThree } from "@react-three/fiber";
import Ecctrl from "ecctrl";
import { Raycaster, Vector3, ArrowHelper, LoopOnce, Euler, BufferGeometry, LineBasicMaterial, Line } from "three";

export default function Wolverine({ position }) {
    const avatarRef = useRef();
    const rigidBodyAvatarRef = useRef();
    const { avatar, setAvatar } = useAvatar();

    const { nodes, materials, animations } = useGLTF("assets/models/avatar/WolverineAvatar.glb");
    const { scene, camera } = useThree();

    const { actions } = useAnimations(animations, avatarRef);
    const [shootSound] = useState(new Audio("/assets/sounds/shoot.mp3"));

    const raycasterRef = useRef(new Raycaster());
    const helperRef = useRef(null);
    const lineRef = useRef(null);

    const [isShooting, setIsShooting] = useState(false);

    const [isAttacking, setIsAttacking] = useState(false);
    const onKeyAattack = useCallback((event) => {
        if (event.key === 'x' || event.key === 'X') {
            if (!isAttacking && actions.Punch) {
                setIsAttacking(true);
                setAvatar({
                    ...avatar,
                    animation: "Punch"
                });

                actions.Punch.reset().fadeIn(0.05).setLoop(LoopOnce).play();
    
                const wolverine = avatarRef.current;
                const origin = new Vector3();
                wolverine.getWorldPosition(origin);
    
                const enemy = scene.getObjectByName("Juggernaut");
                if (!enemy) {
                    console.log('Enemy not found');
                    setIsAttacking(false);
                    return;
                }
    
                const enemyPosition = new Vector3();
                enemy.getWorldPosition(enemyPosition);
    
                const direction = enemyPosition.clone().sub(origin).normalize();
                origin.y += 1.5;
    
                const distance = origin.distanceTo(enemyPosition);
                if (distance < 2) { 
                    console.log('Hit Juggernaut');
                    enemy.parent.userData.handleImpact();
                }
    
                setTimeout(() => {
                    setIsAttacking(false);
                }, 500); 
            }
        }
    }, [actions.Punch, avatarRef, scene, isAttacking]);

    const onKeyDown = useCallback((event) => {
        if (event.key === 'f' || event.key === 'F') {
            if (!isShooting && actions.Shooting) {
                setIsShooting(true);
                setAvatar({
                    ...avatar,
                    animation: "Shooting"
                });
                actions.Shooting.reset().fadeIn(0.05).setLoop(LoopOnce).play();

                shootSound.currentTime = 0;
                shootSound.play();

                const raycaster = raycasterRef.current;
                const wolverine = avatarRef.current;
                const origin = new Vector3();
                wolverine.getWorldPosition(origin);

                const enemy = scene.getObjectByName("Juggernaut");
                if (!enemy) {
                    console.log('Enemy not found');
                    setIsShooting(false);
                    return;
                }

                const enemyPosition = new Vector3();
                enemy.getWorldPosition(enemyPosition);

                const direction = enemyPosition.clone().sub(origin).normalize();
                origin.y += 1.5; 

                raycaster.set(origin, direction);
                const intersects = raycaster.intersectObjects(scene.children, true);

                let rayLength = 50;
                if (intersects.length > 0) {
                    let hitObject = intersects[0].object;

                    rayLength = intersects[0].distance;

                    while (hitObject && !hitObject.userData.name) {
                        hitObject = hitObject.parent;
                    }

                    if (hitObject && hitObject.userData.name === "Juggernaut") {
                        console.log('Hit Juggernaut');
                        const enemyRigidBody = hitObject.userData.rigidBody;
                        if (enemyRigidBody) {
                            hitObject.userData.setIsDead(true);
                        }
                    }
                }

                if (helperRef.current) {
                    scene.remove(helperRef.current);
                }

                if (lineRef.current) {
                    scene.remove(lineRef.current);
                }

                const points = [origin, origin.clone().add(direction.multiplyScalar(rayLength))];
                const geometry = new BufferGeometry().setFromPoints(points);
                const material = new LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
                const line = new Line(geometry, material);

                scene.add(line);
                lineRef.current = line;

                const helper = new ArrowHelper(direction, origin, rayLength, 0xff0000);
                scene.add(helper);
                helperRef.current = helper;

                setTimeout(() => {
                    if (helperRef.current) {
                        scene.remove(helperRef.current);
                        helperRef.current = null;
                    }
                    if (lineRef.current) {
                        scene.remove(lineRef.current);
                        lineRef.current = null;
                    }
                    setIsShooting(false);
                }, 500);
            }
        }
    }, [actions, avatar, setAvatar, shootSound, camera, scene, isShooting]);


    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyAattack);
        return () => {
            window.removeEventListener('keydown', onKeyAattack);
        };
    }, [onKeyAattack]);

    useEffect(() => {
        actions[avatar.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[avatar.animation])
                actions[avatar.animation].fadeOut(0.5);
        };
    }, [actions, avatar.animation]);

    return (
        <Ecctrl
            ref={rigidBodyAvatarRef}
            camInitDis={-2}
            camMaxDis={-2}
            maxVelLimit={5}
            jumpVel={4}
            position={position}
            animated
            floatHeight={0}
            autoBalance={false}
            userData={{ name: "wolverine" }} 
            name="wolverine"
        >
            <group ref={avatarRef} position-y={-0.5} name="Wolverine" >
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
    );
}
