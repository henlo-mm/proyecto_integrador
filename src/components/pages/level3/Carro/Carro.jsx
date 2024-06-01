import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Carro = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/carro/carro_modificado.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <group scale={2}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.carro_1.geometry}
                        material={materials['Material.014']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.carro_2.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.carro_3.geometry}
                        material={materials['Material.012']}
                    />
                </group>
            </group>
        </>
    )
}

export default Carro;
useGLTF.preload("/assets/models/carro/carro.glb");