import { Plane, useGLTF, useTexture} from '@react-three/drei';
import {RepeatWrapping} from "three";
import {CuboidCollider, RigidBody} from "@react-three/rapier"
import { MeshStandardMaterial } from 'three';

const World = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/floor/floorlevel2_modificado.glb");

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

    const floorMaterial = new MeshStandardMaterial({
        color: 0x222222, // Un gris oscuro
        roughness: 0.8,  // Aumenta la rugosidad para menos reflejos, más textura de fábrica
        metalness: 0.5   // Ligera metalicidad para simular superficies desgastadas
    });

    return (
        <>
            <group {...props} dispose={null}>
                    {/* <meshStandardMaterial attach="material" {...propsTexture}  castShadow receiveShadow transparent={true} opacity={0} /> */}
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
                        <Plane args={[200, 80]} position={[-15, -20, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */ color="#413830" />
                        </Plane>
                        <Plane args={[200, 80]} position={[15, -20, 0]} rotation={[0, -Math.PI / 2, 0]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */ color="#413830" />
                        </Plane>
                        <Plane args={[30, 30]} position={[0, 4.2, 70]} rotation={[Math.PI, 0, Math.PI / 2]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */ color="#413830" />
                        </Plane>
                        <Plane args={[30, 30]} position={[0, 4.2, -70]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial attach="material" /* transparent={true} opacity={0} */ color="#413830" />
                        </Plane>
                    </RigidBody>

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cajas.geometry}
                        material={materials.Wooden_box_01_mtl}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Estantes.geometry}
                        material={nodes.Estantes.material}
                    />
                </group>
            </group>
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floorlevel2_modificado.glb");