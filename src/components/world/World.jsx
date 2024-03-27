import {Plane, Sphere, Torus, useGLTF, useTexture} from '@react-three/drei';
import TorusShape from '../shapes/Torus';
import SphereShape from '../shapes/Sphere';
import BoxShape from '../shapes/Box';
import CylinderShape from '../shapes/Cylinder';
import {RepeatWrapping} from "three";

const World = (props) => {

    const {nodes, materials} = useGLTF("/assets/models/floor/floor.glb");

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

    return (
        <>
            <group {...props} dispose={null} rotation={[0, Math.PI / 1.8, 0]}>
                <group>
                    <mesh geometry={nodes.Floor.geometry} material={nodes.Floor.material}>
                        <meshStandardMaterial {...propsTexture} />
                    </mesh>
                    <group position={[0,1,0]}>
                        <mesh geometry={nodes.Mesas_1.geometry} material={materials['Material.001']}/>
                        <mesh geometry={nodes.Mesas_2.geometry} material={materials['Material.002']}/>
                    </group>
                    <group position={[0,0.65,0]}>
                        <mesh geometry={nodes.Carretillas_1.geometry} material={materials['A bit dark wood']}/>
                        <mesh geometry={nodes.Carretillas_2.geometry} material={materials.Metal_Chain}/>
                        <mesh geometry={nodes.Carretillas_3.geometry} material={materials.wooden_cart02}/>
                        <mesh geometry={nodes.Carretillas_4.geometry} material={materials.wooden_cart01}/>
                        <mesh geometry={nodes.Carretillas_5.geometry} material={materials.Bronze}/>
                        <mesh geometry={nodes.Carretillas_6.geometry} material={materials['Black metal']}/>
                        <mesh geometry={nodes.Carretillas_7.geometry} material={materials.wooden_cart04}/>
                    </group>
                    <mesh geometry={nodes.Estantes.geometry} material={materials.SHELVING} position={[0,0.75,0]}/>
                    <mesh geometry={nodes.CarroCompras.geometry} material={materials.ShoppingCart} position={[0,0.7,0]}/>
                </group>
            </group>

            <mesh>
                <Sphere position={[49, 0, -13]}>
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
        </>

    )
}

export default World;
useGLTF.preload("/assets/models/floor/floor.glb");