import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Cinta = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/cinta/cinta.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <mesh castShadow receiveShadow geometry={nodes.Cinta_1.geometry} material={materials.Belt}/>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cinta_2.geometry}
                    material={materials['Material.001']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cinta_3.geometry}
                    material={materials.Cylinder}
                />
            </group>
        </>
    )
}

export default Cinta;
useGLTF.preload("/assets/models/cinta/cinta.glb");