import React, { useMemo } from 'react';
import { Plane, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, CylinderGeometry } from "three";
import { RigidBody } from "@react-three/rapier";
import Carro from "../Carro/Carro";
import Laser from "../Laser/Laser";
import Hacha from "../Hacha/Hacha";

const World = (props) => {

    const { nodes } = useGLTF("/assets/models/floor/floorlevel3.glb");

    const floorMaterial = new MeshStandardMaterial({
        color: "#222222", // Un gris oscuro
        roughness: 0.8,  // Aumenta la rugosidad para menos reflejos, más textura de fábrica
        metalness: 0.5   // Ligera metalicidad para simular superficies desgastadas
    });

    const concreteMaterial = new MeshStandardMaterial({
        color: "#656464", // Gris de concreto
        roughness: 0.9,   // Alta rugosidad para parecer concreto
        metalness: 0.1    // Muy poca metalicidad
    });

    const cylinderGeometry = useMemo(() => new CylinderGeometry(1, 1, 15, 32), []);

    return (
        <>
            <group {...props} dispose={null}>
                <group>
                    <RigidBody type="fixed" colliders="trimesh">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Floor.geometry}
                            material={floorMaterial}
                        />
                    </RigidBody>

                    <RigidBody type="fixed" colliders="trimesh">
                        <Plane args={[140, 22]} position={[-15, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */
                                                  color="#413830"/>
                        </Plane>
                        <Plane args={[140, 22]} position={[15, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */
                                                  color="#413830"/>
                        </Plane>
                        <Plane args={[22, 30]} position={[0, 10, 70]} rotation={[Math.PI, 0, Math.PI / 2]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */
                                                  color="#413830"/>
                        </Plane>
                        <Plane args={[22, 30]} position={[0, 10, -70]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */
                                                  color="#413830"/>
                        </Plane>
                    </RigidBody>

                    <Carro position={[9, -1, -50]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                    <Laser position={[0, 2, -20]} rotation={[0, 0, 0]} castShadow/>

                    <Hacha position={[0, 6, 30]} rotation={[-Math.PI / 2, 0, 0]} castShadow/>

                    {/* Agregar cilindros como columnas de concreto */}
                    <RigidBody type="fixed">
                        <mesh geometry={cylinderGeometry} material={concreteMaterial} position={[10, 6.5, 0]}/>
                        <mesh geometry={cylinderGeometry} material={concreteMaterial} position={[-10, 6.5, 0]}/>
                        <mesh geometry={cylinderGeometry} material={concreteMaterial} position={[10, 6.5, -20]}/>
                        <mesh geometry={cylinderGeometry} material={concreteMaterial} position={[-10, 6.5, -20]}/>
                    </RigidBody>
                </group>
            </group>
        </>
    )
}

export default World;
useGLTF.preload("/assets/models/floor/floorlevel3.glb");
