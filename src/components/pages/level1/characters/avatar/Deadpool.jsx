import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl from "ecctrl";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, LoopOnce } from "three";
import React from "react";

export default function Deadpool() {
	const avatarRef = useRef();
	const rigidBodyAvatarRef = useRef();
	const { avatar, setAvatar } = useAvatar();
    const [bullets, setBullets] = useState([]);


	const { nodes, materials, animations } = useGLTF("assets/models/avatar/AvatarDeadpool.glb");
	const { gl } = useThree();

	const { actions } = useAnimations(animations, avatarRef)
    const shootSound = useRef(new Audio("/assets/sounds/shoot.mp3"));
    
	useEffect(() => {
        if (shootSound.current) {
            shootSound.current.load();
        }

    }, []);


	const shoot = useCallback(() => {
        if (!actions.Shooting || !avatarRef.current) return;
        const startPosition = new Vector3().setFromMatrixPosition(avatarRef.current.matrixWorld);
        startPosition.y += 1.5;  
        startPosition.z += 0.5;  
        const forwardDirection = new Vector3(0, 0, -1).applyQuaternion(avatarRef.current.quaternion);
        setBullets(bullets => [...bullets, { position: startPosition, velocity: forwardDirection }]);
        setAvatar({ ...avatar, animation: "Shooting" });
        actions.Shooting.reset().fadeIn(0.05).setLoop(LoopOnce).play();
        if (shootSound.current) {
            shootSound.current.pause();
            shootSound.current.currentTime = 0;
            shootSound.current.play().catch(error => console.error("Error playing the sound:", error));
        }
    }, [actions, setAvatar, avatar]);

    useFrame((state, delta) => {
        if (bullets.length) {
            setBullets(bullets => bullets.map(bullet => ({
                ...bullet,
                position: bullet.position.add(bullet.velocity.clone().multiplyScalar(delta * 50))
            })).filter(bullet => bullet.position.z > -50 && bullet.position.y > -5));
        }
    });

    useEffect(() => {
        const handleRightClick = (event) => {
            event.preventDefault();
            shoot();
        };
        gl.domElement.addEventListener('contextmenu', handleRightClick);
        return () => {
            gl.domElement.removeEventListener('contextmenu', handleRightClick);
        };
    }, [shoot, gl.domElement]);
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
		});

	}, [avatar, rigidBodyAvatarRef?.current]);


	return (
		<Ecctrl
			ref={rigidBodyAvatarRef}
			camInitDis={-5}
			camMaxDis={-7}
			maxVelLimit={5}
			jumpVel={5}
			position={[2, 10, 48]}
			characterInitDir={170}
			camInitDir={{ x: 0, y: 10 }}
			floatHeight={0}
			
			userData={{ name: "Deadpool" }}
		>

			<group>
			{bullets.map((bullet, index) => (
				<mesh key={`bullet-${index}`} position={bullet.position}>
					<sphereGeometry args={[0.2, 16, 16]} />  
					<meshStandardMaterial color='red' /> 
				</mesh>
			))}


			</group>
			<group ref={avatarRef} position-y={-0.5} name="Deadpool">
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
						name="Wolf3D_Body"
						geometry={nodes.Wolf3D_Body.geometry}
						material={materials.Wolf3D_Body}
						skeleton={nodes.Wolf3D_Body.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Facewear"
						geometry={nodes.Wolf3D_Facewear.geometry}
						material={materials.Wolf3D_Facewear}
						skeleton={nodes.Wolf3D_Facewear.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Glasses"
						geometry={nodes.Wolf3D_Glasses.geometry}
						material={materials.Wolf3D_Glasses}
						skeleton={nodes.Wolf3D_Glasses.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Head"
						geometry={nodes.Wolf3D_Head.geometry}
						material={materials.Wolf3D_Skin}
						skeleton={nodes.Wolf3D_Head.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Headwear"
						geometry={nodes.Wolf3D_Headwear.geometry}
						material={materials.Wolf3D_Headwear}
						skeleton={nodes.Wolf3D_Headwear.skeleton}
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

		</Ecctrl>
	)
}
