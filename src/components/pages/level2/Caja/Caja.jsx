import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Caja = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/caja/caja.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Caja.geometry}
                        material={materials['Small_Wooden_Box.01']}
                    />
                </group>
            </group>
        </>
    )
}

export default Caja;
useGLTF.preload("/assets/models/caja/caja.glb");