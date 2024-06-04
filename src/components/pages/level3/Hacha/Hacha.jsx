import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {RigidBody} from "@react-three/rapier";
import {useRef, useState} from "react";

export default function Hacha({position, rotation, onCollision, direction}) {
    const hachaRef = useRef(null);
    const hachaBodyRef = useRef(null);

    const {nodes, materials} = useGLTF("/assets/models/hacha/hacha.glb");

    useFrame(({clock}) => {
        if (hachaBodyRef.current) { // Verifica si la referencia está definida
            const elapsedTime = clock.getElapsedTime();
            const speed = 2.5;
            const amplitude = 15; // Amplitud de la oscilación

            // Calcula la posición en X basada en una función seno
            const moveX = position[0] + direction * Math.sin(elapsedTime * speed) * amplitude;

            // Actualiza la posición del hacha
            hachaBodyRef.current.setTranslation({
                x: moveX,
                y: hachaBodyRef.current.translation().y,
                z: hachaBodyRef.current.translation().z,
            }, true);
        }
    });

    return (
        <RigidBody ref={hachaBodyRef} type="fixed" position={position}>
            <group ref={hachaRef} dispose={null} scale={5} position={position} rotation={rotation}>
                <group name="Scene">
                    <group name="Rigid">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cuchilla.geometry}
                            material={materials["Blade.001"]}
                        />
                    </group>
                </group>
            </group>
        </RigidBody>
    );
}

useGLTF.preload("/assets/models/hacha/hacha.glb");
