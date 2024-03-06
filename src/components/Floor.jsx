import {Plane, OrbitControls, Sphere, Torus} from '@react-three/drei';
import TorusShape from './shapes/Torus';
import SphereShape from './shapes/Sphere';
import BoxShape from './shapes/Box';
import CylinderShape from './shapes/Cylinder';

const Floor = () => {

    return (

        <>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[10, 10, 5]}/>

            <spotLight position={[10, 20, 10]} angle={0.3} intensity={1}/>
            <Plane args={[10, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>


                {/* Material para la superficie del piso */}


                {/* <meshLambertMaterial attach="material" color="grey" /> */}

                {/* <meshNormalMaterial attach="material" color="grey" /> */}

                <meshPhongMaterial attach="material" color="silver" shininess={10}/>
                {/* <meshToonMaterial attach="material" color="red" /> */}

                {/* <meshPhysicalMaterial attach="material" color="gray" /> */}


            </Plane>

            {/* Objetos sin animación  */}

            <mesh>
                <Sphere position={[-5, 1, 30]}>
                    <meshNormalMaterial flatShading={true}/>
                </Sphere>
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
            <OrbitControls/>
        </>

    )
}

export default Floor;