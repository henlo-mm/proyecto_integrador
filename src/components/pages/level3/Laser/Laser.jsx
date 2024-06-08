import React, {useEffect, useRef, useState} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';
import { useFrame } from '@react-three/fiber';
import {useLives} from "../../../context/LivesContext";


const Projectile = ({ initialPosition, velocity, onCollision }) => {
    const [position, setPosition] = useState([...initialPosition]);
    
    const handleCollision = () => {
        console.log('Collision with object')
        loseLife();
    };

    const {loseLife} = useLives();


    const [isCooldown, setIsCooldown] = useState(false);
    

    const handleCollisionEnter = (event) => {
        if (!isCooldown && event.rigidBody.userData.name === "wolverine") {
            console.log("Colisión con el proyectil")
            handleCollision();
            setIsCooldown(true);
            setTimeout(() => {
                setIsCooldown(false);
            }, 1000); 
        }
    };

    useFrame(() => {
        setPosition((prev) => [prev[0] + (velocity[2] / 2), prev[1], prev[2] ]);
    });

    return (
        <RigidBody  type="fixed"  onCollisionEnter={handleCollisionEnter}>
            <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>

    );
};

const Laser = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/laser/laser.glb");

    const [projectiles, setProjectiles] = useState([]);
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setProjectiles((prev) => [
                ...prev,
                { id: counter, position: [...props.position], velocity: [0, 0, -1] },
            ]);
            setCounter(counter + 1);
        }, 2000); 

        return () => clearInterval(interval);
    }, [props.position, counter]);

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
                <Projectile key={proj.id} initialPosition={proj.position} velocity={proj.velocity} onCollision={props.onCollision} />
            ))}
        </>
    )
}

export default Laser;
useGLTF.preload("/assets/models/laser/laser.glb");