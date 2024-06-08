import React, {useEffect, useRef, useState} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';
import { useFrame } from '@react-three/fiber';

const Projectile = ({ position, velocity }) => {
    useFrame(() => {
        position[2] += velocity[2];
    });

    return (
        <mesh position={position}>
            <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
};

const Laser = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/laser/laser.glb");

    const [projectiles, setProjectiles] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProjectiles((prev) => [
                ...prev,
                { id: Date.now(), position: [...props.position], velocity: [0, 0, -1] },
            ]);
        }, 100); 

        return () => clearInterval(interval);
    }, [props.position]);

    return (
        <>
            <group {...props}  dispose={null}>
                <group scale={0.5}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Laser.geometry}
                        material={materials['Material.001']}
                    />
                </group>
            </group>

            {projectiles.map((proj) => (
                <Projectile key={proj.id} position={proj.position} velocity={proj.velocity} />
            ))}
        </>
    )
}

export default Laser;
useGLTF.preload("/assets/models/laser/laser.glb");