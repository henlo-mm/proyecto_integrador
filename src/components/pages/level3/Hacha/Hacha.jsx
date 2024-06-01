import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Hacha = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/hacha/hacha.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Hacha_1.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Hacha_2.geometry}
                        material={materials['Material.005']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Hacha_3.geometry}
                        material={materials['Material.004']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Hacha_4.geometry}
                        material={materials['Material.002']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Hacha_5.geometry}
                        material={materials['Material.001']}
                    />
                </group>
            </group>
        </>
    )
}

export default Hacha;
useGLTF.preload("/assets/models/hacha/hacha.glb");