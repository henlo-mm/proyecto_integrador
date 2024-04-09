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
                                <meshStandardMaterial {...propsTexture} /* transparent={true} opacity={0.0} */ />
                            </mesh>
                        </RigidBody>
                        <group position={[0,1,0]} >
                            <RigidBody  type="fixed" >

                                <mesh geometry={nodes.Mesas_1.geometry} material={materials['Material.001']} />
                                <mesh geometry={nodes.Mesas_2.geometry} material={materials['Material.002']} > 
                                    <meshStandardMaterial {...propsTextureMesa}  castShadow={true}  />
                                </mesh>
                                <CuboidCollider args={[1, 0.5]} position={[0,1,0]} />
                            </RigidBody>
                        </group>
                        <group position={[0,0.65,0]}>
                            <mesh geometry={nodes.Carretillas_1.geometry} material={materials['A bit dark wood']} castShadow={true}/>
                            <mesh geometry={nodes.Carretillas_2.geometry} material={materials.Metal_Chain} castShadow={true}/>
                            <mesh geometry={nodes.Carretillas_3.geometry} material={materials.wooden_cart02} castShadow={true}/>
                            <mesh geometry={nodes.Carretillas_4.geometry} material={materials.wooden_cart01} castShadow={true} />
                            <mesh geometry={nodes.Carretillas_5.geometry} material={materials.Bronze} castShadow={true}/>
                            <mesh geometry={nodes.Carretillas_6.geometry} material={materials['Black metal']} castShadow={true}/>
                            <mesh geometry={nodes.Carretillas_7.geometry} material={materials.wooden_cart04} castShadow={true}/>
                        </group>
                        <mesh geometry={nodes.Estantes.geometry} material={materials.SHELVING} position={[0,0.75,0]} castShadow={true}>
                            <meshStandardMaterial {...propsTextureEstante} />
                        </mesh>
                        <mesh geometry={nodes.CarroCompras.geometry} material={materials.ShoppingCart} position={[0,0.7,0]} castShadow={true} />
                          
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