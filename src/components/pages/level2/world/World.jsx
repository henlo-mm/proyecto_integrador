import { Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from "three";
import {CuboidCollider, RigidBody} from "@react-three/rapier"

const World = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/floor/floorlevel2.glb");

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
                    {/* <meshStandardMaterial attach="material" {...propsTexture}  castShadow receiveShadow transparent={true} opacity={0} /> */}
                <group>
                    <RigidBody type="fixed" colliders="trimesh">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Floor.geometry}
                            material={nodes.Floor.material}
                        />
                    </RigidBody>

                    <RigidBody type="fixed" colliders="trimesh">
                        <Plane args={[100, 10]} position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" transparent={true} opacity={0} />
                        </Plane>
                        <Plane args={[100, 10]} position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" transparent={true} opacity={0} />
                        </Plane>
                    </RigidBody>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cajas.geometry}
                        material={materials.Wooden_box_01_mtl}
                        position={[4.343, -0.48, 27.315]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Estantes.geometry}
                        material={nodes.Estantes.material}
                        position={[0.712, 0.006, 0.647]}
                        rotation={[0, -0.007, 0]}
                    />
                </group>
            </group>
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floorlevel2.glb");