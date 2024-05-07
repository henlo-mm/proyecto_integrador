import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl from "ecctrl";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { forwardRef } from "react";

export default function Deadpool({ onCollision }) {
	const avatarRef = useRef();
	const rigidBodyAvatarRef = useRef();
	const { avatar, setAvatar } = useAvatar();


	const { nodes, materials, animations } = useGLTF("assets/models/avatar/AvatarDeadpool.glb");
	const { gl } = useThree();

	const { actions } = useAnimations(animations, avatarRef)
	const shootSound = useMemo(() => {
		const audio = new Audio("/assets/sounds/shoot.mp3");
		audio.load(); 
		return audio;
	}, []);
	

	const onRightClick = useCallback((event) => {
		event.preventDefault();
		if (actions.Shooting) {
			setAvatar({ ...avatar, animation: "Shooting" });
			actions.Shooting.reset().fadeIn(0.05).setLoop(THREE.LoopOnce).play();
	
			shootSound.pause();
			shootSound.currentTime = 0;
			shootSound.play().catch(error => console.error("Error playing the sound:", error));
		}
	}, [actions, avatar, setAvatar, shootSound]);
	

	useEffect(() => {
		gl.domElement.addEventListener('contextmenu', onRightClick);
		return () => {
			gl.domElement.removeEventListener('contextmenu', onRightClick);
		};
	}, [gl.domElement, onRightClick]);


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
			maxVelLimit={20}
			jumpVel={5}
			position={[2, 10, 48]}
			characterInitDir={170}
			camInitDir={{ x: 0, y: 10 }}
			floatHeight={0}
			animated
			followLight
			userData={{ name: "Deadpool" }}
		>

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
