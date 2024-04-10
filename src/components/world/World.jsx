import { Sphere, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useRef } from 'react';

const World = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/floor/floor.glb");
    const treeRef = useRef()

    const PATH = "/assets/textures/floor/";
    const propsTexture = useTexture({
        map: PATH + "dirty_concrete_diff_1k.jpg",
        normalMap: PATH + "dirty_concrete_nor_gl_1k.jpg",
        roughnessMap: PATH + "dirty_concrete_rough_1k.jpg",
        displacementMap: PATH + "dirty_concrete_rough_1k.jpg",
    });

    propsTexture.map.repeat.set(4, 64);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 64);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 64);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 64);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;


    const PATH_ESTANTE = "/assets/textures/estantes/";
    const propsTextureEstante = useTexture({
        map: PATH_ESTANTE + "rusty_metal_02_diff_1k.jpg",
        normalMap: PATH_ESTANTE + "rusty_metal_02_nor_gl_1k.jpg",
        roughnessMap: PATH_ESTANTE + "rusty_metal_02_rough_1k.jpg",
       // alphaMap: PATH_ESTANTE + "celandine_01_alpha_1k.png",
    });

    const PATH_MESA = "/assets/textures/mesas/";
    const propsTextureMesa = useTexture({
        map: PATH_MESA + "fabric_pattern_07_col_1_1k.png",
        normalMap: PATH_MESA + "fabric_pattern_07_nor_gl_1k.jpg",
        roughnessMap: PATH_MESA + "fabric_pattern_07_rough_1k.jpg",
       // alphaMap: PATH_ESTANTE + "celandine_01_alpha_1k.png",
    });

   

    return (
        <>
                <group {...props} dispose={null} rotation={[0, Math.PI / 1.8, 0]}>
                    <group>
                        <RigidBody type="fixed">
                            <mesh geometry={nodes.Floor.geometry} material={nodes.Floor.material} receiveShadow={true}>
                                <meshStandardMaterial {...propsTexture} transparent={true} opacity={0.0} />
                            </mesh>
                        </RigidBody>
                        <group position={[0,1,0]} >
                            <RigidBody type="fixed" colliders={false}>

                                <mesh geometry={nodes.Mesas_1.geometry} material={materials['Material.001']} />
                                <mesh geometry={nodes.Mesas_2.geometry} material={materials['Material.002']} > 
                                    <meshStandardMaterial {...propsTextureMesa}  castShadow={true}  />
                                </mesh>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[1.8, -0.5, 24.9]}/>
                                <CuboidCollider args={[1, 0.5, 0.9]} position={[-0.8, -0.5, 22.2]}/>
                                <CuboidCollider args={[1, 0.5, 0.9]} position={[-3.5, -0.5, 19.8]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[3, -0.5, 15]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[0.5, -0.5, 15]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[-3, -0.5, 10]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[-0.5, -0.5, 10]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[3.5, -0.5, 3]}/>
                                <CuboidCollider args={[1.2, 0.5, 1.1]} position={[3.5, -0.5, 0.2]}/>
                                <CuboidCollider args={[5, 0.5, 1.1]} position={[0, -0.5, -11.3]}/>
                               
                            </RigidBody>
                        </group>
                      

                         <RigidBody type="fixed" colliders={false}>

                            <mesh geometry={nodes.Estantes.geometry} material={materials.SHELVING} position={[0,0.75,0]} castShadow={true}>
                                <meshStandardMaterial {...propsTextureEstante} />
                            </mesh>
                            <CuboidCollider args={[0.3, 1.2, 1.5]} position={[2.2, 0.8, 35.8]}/>

                         </RigidBody>
                        <RigidBody type="fixed" colliders={false}>
                            <mesh geometry={nodes.CarroCompras.geometry} material={materials.ShoppingCart} position={[0,0.7,0]} castShadow={true} />
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[4, 0.4, 44]}/>
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[4, 0.4, 42]}/>
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[-4, 0.4, 39.5]}/>
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[3.9, 0.4, 30]}/>
                            <CuboidCollider args={[0.6, 0.5, 0.7]} position={[1.3, 0.4, 22.7]}/>
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[-1.8, 0.4, 20]}/>
                            <CuboidCollider args={[0.7, 0.5, 0.5]} position={[-1.8, 0.4, 8]}/>
                            <CuboidCollider args={[0.5, 0.5, 0.7]} position={[-2.5, 0.4, -9.3]}/>
                            <CuboidCollider args={[0.5, 0.5, 0.7]} position={[2.5, 0.4, -9.6]}/>
                            <CuboidCollider args={[0.5, 0.5, 0.7]} position={[4.2, 0.4, -15]}/>
                            <CuboidCollider args={[0.5, 0.5, 0.7]} position={[4.2, 0.4, -17.5]}/>
                        </RigidBody>
                    </group>
                </group>

                <mesh>
                    <Sphere position={[49, 0, -13]} castShadow={true}>
                    </Sphere>
                </mesh>
                <mesh>
                    <Sphere position={[50, 0, -4]}>
                    </Sphere>
                </mesh>
                <mesh>
                    <Sphere position={[-50, 0, 4]}>
                    </Sphere>
                </mesh>
                <mesh>
                    <Sphere position={[-49, 0, 13]}>
                    </Sphere>
                </mesh>

            {/*     <group {...props} dispose={null}>
                <group>
                    <mesh geometry={nodes.Walls.geometry} material={materials.wallMaterial} />
                    <mesh receiveShadow={true} geometry={nodes.Floor.geometry} material={materials.floorMaterial} />
                    <mesh castShadow={true} geometry={nodes.WoodenFence.geometry} material={materials.woodMaterial} />
                </group>
            </group> */}
            
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floor.glb");