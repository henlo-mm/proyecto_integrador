import { Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from "three";
import {CuboidCollider, RigidBody} from "@react-three/rapier"

const World = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/floor/floormejorado.glb");

    const PATH = "/assets/textures/floor/level2/";
    const propsTexture = useTexture({
        map: PATH + "concrete_layers_02_diff_1k.jpg",
        normalMap: PATH + "concrete_layers_02_nor_gl_1k.jpg",
        roughnessMap: PATH + "concrete_layers_02_rough_1k.jpg",
        displacementMap: PATH + "concrete_layers_02_disp_1k.png",
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
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Floor.geometry}
                        material={nodes.Floor.material}
                    >
                        {/* <meshStandardMaterial attach="material" {...propsTexture}  castShadow receiveShadow transparent={true} opacity={0} /> */}
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <Plane args={[100, 10]} position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <meshStandardMaterial attach="material" transparent={true} opacity={0} />
                    </Plane>
                    <Plane args={[100, 10]} position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <meshStandardMaterial attach="material" transparent={true} opacity={0} />
                    </Plane>
                </RigidBody>
                <RigidBody type="fixed" colliders={false}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesas.geometry}
                        material={nodes.Mesas.material}
                        position={[2.219, -0.238, 25.799]}
                        rotation={[0, -0.442, 0]}
                        scale={0.1}
                    >
                        <meshStandardMaterial {...propsTextureMesa} />

                    </mesh>
                    <CuboidCollider args={[1, 0.5, 1]} position={[1.8, -0.5, 24.8]} 
                                    rotation={[0, -Math.PI / 7, 0]}/>
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
                <RigidBody type="fixed" colliders={false}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Estantes.geometry}
                        material={nodes.Estantes.material}
                        position={[-3.535, 0.006, -43.937]}
                    >
                         <meshStandardMaterial {...propsTextureEstante} />
                    </mesh>
                    <CuboidCollider args={[1.3, 1.0, 0.2]} position={[2.4, 0.1, 33.6]}/>
                    <CuboidCollider args={[1.3, 1.0, 0.2]} position={[-3.3, 0.1, 33.6]} />
                    <CuboidCollider args={[1.3, 1.0, 0.2]} position={[-0.3, 0.1, 33.6]}
                                    rotation={[0, -Math.PI / 1, 0]}/>
                                    
                    <CuboidCollider args={[0.3, 1.0, 1.3]} position={[-2.7, 0.1, 0.8]}
                                    rotation={[0, Math.PI / 2, 0]}/>
                    <CuboidCollider args={[0.3, 1.0, 1.3]} position={[0.7, 0.1, 0.8]} 
                                    rotation={[0, Math.PI / 2, 0]}/>
                 
                    <CuboidCollider args={[1.3, 1.0, 0.3]} position={[3.5, 0.1, -30.15]}/>

                    <CuboidCollider args={[1.3, 1.0, 0.3]} position={[2.3, 0.1, -35]}/>
                    
                    <CuboidCollider args={[1.3, 1.0, 0.3]} position={[-3.5, 0.1, -43.8]}/>
                    <CuboidCollider args={[1.3, 1.0, 0.3]} position={[-0.3, 0.1, -39.8]}/>
               
                   
                    <CuboidCollider args={[1.3, 1.0, 0.3]} position={[-0.9, 0.1, -43.8]}/>
                </RigidBody>

                <RigidBody type="fixed" colliders={false}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.CarroCompras.geometry}
                        material={materials.ShoppingCart}
                        position={[-4.174, -0.849, 39.612]}
                        rotation={[-Math.PI, 1.522, -Math.PI]}
                        scale={0.015}
                    >
                    </mesh>
                    <CuboidCollider args={[0.7, 0.5, 0.5]} position={[4.3, -0.4, 44.1]}
                                    rotation={[0, -Math.PI / 6, 0]}/>
                    <CuboidCollider args={[0.7, 0.5, 0.5]} position={[4.5, -0.4, 42]}/>
                    <CuboidCollider args={[0.7, 0.5, 0.5]} position={[-4, -0.4, 39.5]}/>
                    <CuboidCollider args={[0.7, 0.5, 0.4]} position={[4.1, -0.4, 29.9]}
                                    rotation={[0, Math.PI / 6, 0]}/>
                    <CuboidCollider args={[0.4, 0.5, 0.7]} position={[1.3, -0.4, 22.8]}
                                    rotation={[0, Math.PI / 8, 0]}/>
                    <CuboidCollider args={[0.5, 0.5, 0.7]} position={[-1.6, -0.4, 20.2]}/>
                    <CuboidCollider args={[0.5, 0.5, 0.7]} position={[-1.8, -0.4, 8]}/>
                    <CuboidCollider args={[0.5, 0.5, 0.7]} position={[-2.5, -0.4, -9.3]}/>
                    <CuboidCollider args={[0.5, 0.5, 0.7]} position={[2.5, -0.4, -9.6]}/>
                    <CuboidCollider args={[0.5, 0.5, 0.7]} position={[4.2, -0.4, -15]}/>
                </RigidBody>
                    
                </group>
            </group>
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floormejorado.glb");