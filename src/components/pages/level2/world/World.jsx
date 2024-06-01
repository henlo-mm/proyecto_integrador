import React, {useRef, useEffect} from "react";
import {useFrame} from "@react-three/fiber";
import {Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from "three";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {MeshStandardMaterial} from 'three';
import Caja from "../Caja/Caja";
import Container from "../Container/Container";
import Cinta from "../Cinta/Cinta";
import CajaIzquierda from "../Caja/CajaIzquierda";
import CajaDerecha from "../Caja/CajaDerecha";
import ContainerDerecho from "../Container/ContainerDerecho";
import ContainerIzquierdo from "../Container/ContainerIzquierdo";

const World = (props) => {
    const {nodes, materials} = useGLTF("/assets/models/floor/floorlevel2_modificado.glb");

    const floorMaterial = new MeshStandardMaterial({
        color: 0x222222, // Un gris oscuro
        roughness: 0.8,  // Aumenta la rugosidad para menos reflejos, más textura de fábrica
        metalness: 0.5   // Ligera metalicidad para simular superficies desgastadas
    });

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

                    <RigidBody type="fixed">
                        <Container position={[9, 0.6, -50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Container position={[-3.2, 0.6, -50]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                        {/*Cajas para subir al container*/}
                        <>
                            <Caja position={[13, -0.5, -25]} castShadow/>
                            <Caja position={[12, -0.5, -23]} castShadow/>
                            <Caja position={[12, 0.3, -23]} castShadow/>
                            <Caja position={[11, -0.5, -21]} castShadow/>
                            <Caja position={[11, 0.4, -21]} castShadow/>
                            <Caja position={[11, 1.3, -21]} castShadow/>
                            <Caja position={[8.5, -0.5, -21]} castShadow/>
                            <Caja position={[8.5, 0.4, -21]} castShadow/>
                            <Caja position={[8.5, 1.3, -21]} castShadow/>
                        </>

                        <Container position={[-9, 0.6, -20]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Container position={[3.2, 0.6, -20]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                        {/*Cajas que demarcan el espacio para los juggernauts*/}
                        <>
                            <Caja position={[9, -0.5, 10]} castShadow/>
                            <Caja position={[11, -0.5, 10]} castShadow/>
                            <Caja position={[11, 0.3, 10]} castShadow/>
                            <Caja position={[13, -0.5, 10]} castShadow/>
                            <Caja position={[13, 0.4, 10]} castShadow/>
                            <Caja position={[13, 1.3, 10]} castShadow/>

                            <Caja position={[-16, -0.5, 30]} castShadow/>
                            <Caja position={[-16, 0.4, 30]} castShadow/>
                            <Caja position={[-16, 1.3, 30]} castShadow/>
                            <Caja position={[-14, -0.5, 30]} castShadow/>
                            <Caja position={[-14, 0.3, 30]} castShadow/>
                            <Caja position={[-12, -0.5, 30]} castShadow/>
                        </>
                    </RigidBody>

                    {/*Cintas transportadoras*/}
                    <>
                        {/*Primer cinta transportadora*/}
                        <Cinta position={[12.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[7.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[2.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-2.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-7.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-12.5, -1, -10]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                        {/*Segunda cinta transportadora*/}
                        <Cinta position={[12.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[7.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[2.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-2.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-7.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-12.5, -1, -5]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                        {/*Tercer cinta transportadora*/}
                        <Cinta position={[12.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[7.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[2.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-2.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-7.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-12.5, 20, 40]} rotation={[0, Math.PI / 2, 0]} castShadow/>

                        {/*Cuarta cinta transportadora*/}
                        <Cinta position={[12.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[7.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[2.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-2.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-7.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                        <Cinta position={[-12.5, 20, 50]} rotation={[0, Math.PI / 2, 0]} castShadow/>
                    </>

                    {/*Cajas de las cintas transportadoras*/}
                    <>
                        {/*Primer cinta transportadora*/}
                        <CajaIzquierda position={[-16, -0.4, -10]} offset={0} castShadow  onCollision={props.handleCollisionWithObject}  />
                        <CajaIzquierda position={[-14, -0.4, -10]} offset={0.05} castShadow  onCollision={props.handleCollisionWithObject} />
                        <CajaIzquierda position={[-12, -0.4, -10]} offset={0.1} castShadow  onCollision={props.handleCollisionWithObject} />

                        {/*Segunda cinta transportadora*/}
                        <CajaDerecha position={[13, -0.4, -5]} offset={0} castShadow onCollision={props.handleCollisionWithObject} />
                        <CajaDerecha position={[11, -0.4, -5]} offset={0.05} castShadow onCollision={props.handleCollisionWithObject} />
                        <CajaDerecha position={[9, -0.4, -5]} offset={0.1} castShadow onCollision={props.handleCollisionWithObject} />
                    </>

                    {/*Containers de las cintas transportadoras*/}
                    <>
                        {/*Tercer cinta transportadora*/}
                        <ContainerDerecho position={[14, 14, 40]} offset={0} rotation={[Math.PI / 2, 0, 0]} castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerDerecho position={[14, 6, 40]} offset={0} rotation={[Math.PI / 2, 0, 0]} castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerDerecho position={[9, 14, 40]} offset={0.1} rotation={[Math.PI / 2, 0, 0]}
                                          castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerDerecho position={[9, 6, 40]} offset={0.1} rotation={[Math.PI / 2, 0, 0]} castShadow onCollision={props.handleCollisionWithObject} />

                        {/*Cuarta cinta transportadora*/}
                        <ContainerIzquierdo position={[-15, 14, 50]} offset={0} rotation={[Math.PI / 2, 0, 0]}
                                            castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerIzquierdo position={[-15, 6, 50]} offset={0} rotation={[Math.PI / 2, 0, 0]}
                                            castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerIzquierdo position={[-10, 14, 50]} offset={0.1} rotation={[Math.PI / 2, 0, 0]}
                                            castShadow onCollision={props.handleCollisionWithObject} />
                        <ContainerIzquierdo position={[-10, 6, 50]} offset={0.1} rotation={[Math.PI / 2, 0, 0]}
                                            castShadow onCollision={props.handleCollisionWithObject} />
                    </>
                </group>
            </group>
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floorlevel2_modificado.glb");