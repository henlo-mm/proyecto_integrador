import {Plane, OrbitControls, Sphere, Torus, useGLTF, useTexture} from '@react-three/drei';
import TorusShape from './shapes/Torus';
import SphereShape from './shapes/Sphere';
import BoxShape from './shapes/Box';
import CylinderShape from './shapes/Cylinder';
import {RepeatWrapping} from "three";

const Floor = (props) => {

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
            <ambientLight intensity={0.5}/>
            <directionalLight position={[10, 10, 5]}/>
            <spotLight position={[10, 20, 10]} angle={0.3} intensity={1}/>

            <group {...props} dispose={null}>
                <group>
                    <mesh geometry={nodes.Floor.geometry} material={materials.Material}>
                        <meshStandardMaterial {...propsTexture} />
                    </mesh>
                </group>
            </group>
            {/*<Plane args={[10, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>*/}

            {/* Material para la superficie del piso */}
            {/* <meshLambertMaterial attach="material" color="grey" /> */}
            {/* <meshNormalMaterial attach="material" color="grey" /> */}
            {/*<meshPhongMaterial attach="material" color="silver" shininess={10}/>*/}
            {/* <meshToonMaterial attach="material" color="red" /> */}
            {/* <meshPhysicalMaterial attach="material" color="gray" /> */}

            {/*</Plane>*/}e

            {/* Objetos sin animación  */}
            <mesh>
                <Sphere position={[-5, 1, 30]}>
                    <meshNormalMaterial flatShading={true}/>
                </Sphere>
            </mesh>
            <mesh>
                <Torus position={[0, 1, 45]} args={[20, 5, 30, 200]} rotation={[0, Math.PI / 2, 0]} scale={0.04}>
                    <meshNormalMaterial flatShading={true}/>
                </Torus>
            </mesh>
            <mesh>
                <Torus position={[5, 0.5, 25]} args={[0.5, 0.2, 16, 100]}>
                    <meshMatcapMaterial attach="material"/>
                </Torus>
            </mesh>

            {/* Animación de posición en seno o coseno de objetos primitivos  */}
            <mesh>
                <TorusShape/>
            </mesh>
            <mesh>
                <SphereShape/>
            </mesh>
            <mesh>
                <BoxShape x={15} y={1} z={-10}/>
            </mesh>
            <mesh>
                <BoxShape x={20} y={1} z={-13}/>
            </mesh>
            <mesh>
                <BoxShape x={25} y={1} z={-16}/>
            </mesh>
            <mesh>
                <BoxShape x={30} y={1} z={-19}/>
            </mesh>
            <mesh>
                <BoxShape x={35} y={1} z={-22}/>
            </mesh>
            <mesh>
                <CylinderShape x={0.1} y={1} z={20}/>
            </mesh>
            <mesh>
                <CylinderShape x={-3} y={1} z={15}/>
            </mesh>
            <mesh>
                <CylinderShape x={3} y={1} z={3}/>
            </mesh>
            <OrbitControls makeDefault target={[0, 1, 45]}/>
        </>

    )
}

export default Floor;

useGLTF.preload("/assets/models/floor/floor.glb");