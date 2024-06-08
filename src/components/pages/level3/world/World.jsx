import React, {useMemo, useEffect, useRef, useState} from 'react';
import {Plane, useGLTF} from '@react-three/drei';
import {MeshStandardMaterial, CylinderGeometry} from "three";
import {RigidBody, CuboidCollider} from "@react-three/rapier";
import Carro from "../Carro/Carro";
import Laser from "../Laser/Laser";
import Hacha from "../Hacha/Hacha";
import { useFrame } from '@react-three/fiber';

const World = ({ handleCollisionWithObject }) => {

    const {nodes} = useGLTF("/assets/models/floor/floorlevel3.glb");

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

    const columnRefs = [useRef(), useRef(), useRef(), useRef()];
    const [fallenColumns, setFallenColumns] = useState([false, false, false, false]);

    const columns = [
        { position: [14, 6.5, -15], ref: columnRefs[0], index: 0},
        { position: [-14, 6.5, -8], ref: columnRefs[1], index: 1},
        { position: [14, 6.5, -3], ref: columnRefs[2], index: 2},
        { position: [-14, 6.5, 5], ref: columnRefs[3], index: 3}
    ];


    useFrame(({scene}) => {
        const wolverine = scene.getObjectByName("Wolverine");
        if (wolverine) {
            const wolverinePosition = wolverine.position;

            columns.forEach(column => {
                const [cx, cy, cz] = column.position;
                const [wx, wy, wz] = [wolverinePosition.x, wolverinePosition.y, wolverinePosition.z];
                const distance = Math.sqrt((cx - wx) ** 2 + (cy - wy) ** 2 + (cz - wz) ** 2);

                if (distance < 20 && !fallenColumns[column.index]) {
                    setTimeout(() => {
                        if (column.ref.current) {
                            column.ref.current.applyImpulse({ x: 0, y: 0, z: 0 }, true); // Fuerza ajustada
                        }
                        setFallenColumns(prev => {
                            const newFallenColumns = [...prev];
                            newFallenColumns[column.index] = true;
                            return newFallenColumns;
                        });
                    }, Math.random() * 2000 + 1000); // Tiempo aleatorio entre 1 y 3 segundos
                }
            });
        }
    });
    


    return (
        <>
            <group dispose={null}>
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


                    <>
                        <Carro position={[9, -1, -50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <CuboidCollider args={[2.2, 0.5, 1]} position={[9.3, -0.4, -50]}/>
                        <CuboidCollider args={[0.8, 1, 1]} position={[9, 0, -50]}/>

                        <Carro position={[4, -1, -47]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <CuboidCollider args={[2.2, 0.5, 1]} position={[4.5, -0.4, -47]}/>
                        <CuboidCollider args={[0.8, 1, 1]} position={[4, 0, -47]}/>

                        <Carro position={[-9, -1, 15]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <CuboidCollider args={[2.2, 0.5, 1]} position={[-8.7, -0.4, 15]}/>
                        <CuboidCollider args={[0.8, 1, 1]} position={[-9, 0, 15]}/>

                        <Carro position={[9, -1, 35]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <CuboidCollider args={[2.2, 0.5, 1]} position={[9.3, -0.4, 35]}/>
                        <CuboidCollider args={[0.8, 1, 1]} position={[9, 0, 35]}/>

                        <Carro position={[4, -1, 38]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <CuboidCollider args={[2.2, 0.5, 1]} position={[4.3, -0.4, 38]}/>
                        <CuboidCollider args={[0.8, 1, 1]} position={[4, 0, 38]}/>
                    </>

                    <>
                      {/*   <Laser position={[-15, 0.5, -25]} rotation={[0, 0, 0]} onCollision={handleCollisionWithObject} castShadow/> */}
                        <Laser position={[15, 0.5, -30]} rotation={[0, Math.PI, 0]} onCollision={handleCollisionWithObject} castShadow/>
                     {/*    <Laser position={[-15, 0.5, -35]} rotation={[0, 0, 0]} onCollision={handleCollisionWithObject} castShadow/> */}
                        <Laser position={[15, 0.5, -40]} rotation={[0, Math.PI, 0]} onCollision={handleCollisionWithObject} castShadow/>

                        <Laser position={[15, 0.5, 40]} rotation={[0, Math.PI, 0]} onCollision={handleCollisionWithObject} castShadow/>
                      {/*   <Laser position={[-15, 0.5, 45]} rotation={[0, 0, 0]} onCollision={handleCollisionWithObject} castShadow/> */}
                        <Laser position={[15, 0.5, 50]} rotation={[0, Math.PI, 0]} onCollision={handleCollisionWithObject} castShadow/>
                     {/*    <Laser position={[-15, 0.5, 55]} rotation={[0, 0, 0]} onCollision={handleCollisionWithObject} castShadow/> */}
                    </>

                    <>
                        <Hacha position={[0, 0, 10]} rotation={[0, 0, -Math.PI / 2]} direction={1} castShadow  onCollision={handleCollisionWithObject} />
                        <Hacha position={[0, 0, 13]} rotation={[0, 0, -Math.PI / 2]} direction={-1} castShadow  onCollision={handleCollisionWithObject} />
                        <Hacha position={[0, 0, 16]} rotation={[0, 0, -Math.PI / 2]} direction={1} castShadow  onCollision={handleCollisionWithObject} />
                    </>

                    {columns.map((column, index) => (
                        <RigidBody key={index} type="dynamic" ref={column.ref} /* colliders="ball"   */angularFactor={[0, 0, 0]} >
                            <mesh geometry={cylinderGeometry} material={concreteMaterial} position={column.position}  onCollision={handleCollisionWithObject}/>
                        </RigidBody>
                    ))}
                </group>
            </group>
        </>
    )
}

export default World;
useGLTF.preload("/assets/models/floor/floorlevel3.glb");
