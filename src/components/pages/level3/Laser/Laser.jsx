import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Laser = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/laser/laser.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Laser.geometry}
                        material={materials['Material.001']}
                    />
                </group>
            </group>
        </>
    )
}

export default Laser;
useGLTF.preload("/assets/models/laser/laser.glb");