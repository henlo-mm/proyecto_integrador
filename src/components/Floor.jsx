import { Plane, OrbitControls,  Sphere, Torus } from '@react-three/drei';
import TorusShape from './shapes/Torus';
import SphereShape from './shapes/Sphere';
import BoxShape from './shapes/Box';
import CylinderShape from './shapes/Cylinder';

const Floor = () => {

    return (
       
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />

            <spotLight position={[10, 20, 10]} angle={0.3} intensity={1} />
            <Plane args={[100, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} >


                {/* Material para la superficie del piso */}
                
                
                {/* <meshLambertMaterial attach="material" color="grey" /> */}

                {/* <meshNormalMaterial attach="material" color="grey" /> */}
                
                <meshPhongMaterial attach="material" color="silver" shininess={10} />
                {/* <meshToonMaterial attach="material" color="red" /> */}

                {/* <meshPhysicalMaterial attach="material" color="gray" /> */}

      
            </Plane>

            {/* Objetos sin animación  */}

            <Sphere position={[-2, 0.5, 0]}>
                <meshPhysicalMaterial attach="material" color="skyblue" roughness={0.5} metalness={0.1} />
            </Sphere>

            <Torus position={[5, 0.5, 0]} args={[0.5, 0.2, 16, 100]}>
                <meshMatcapMaterial attach="material" />
            </Torus>

           {/* Animación de de posición en seno o coseno de objetos primitivos  */} 
            <TorusShape />
            <SphereShape />
            <BoxShape />
            <CylinderShape />
       
            <OrbitControls />
        </>

    )
}

export default Floor;