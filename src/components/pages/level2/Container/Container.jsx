import React, {useRef} from 'react'
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from 'three';
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {MeshStandardMaterial} from 'three';

const Container = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/container/Container.glb");
    return (
        <>
            <group {...props} dispose={null}>
                <group scale={0.01}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Container.geometry}
                        material={materials['Material.001']}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[165.535, 607.601, 165.535]}
                    />
                </group>
            </group>
        </>
    )
}

export default Container;
useGLTF.preload("/assets/models/container/Container.glb");