import { Cylinder, useTexture } from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const CylinderShape = ({x, y, z}) => {
    const ref = useRef();

    useFrame(({clock}) => {
        /* ref.current.position.z = clock.getElapsedTime(); */
        /* ref.current.position.z = Math.sin(clock.getElapsedTime()) */
       /*  const frecuenciaZ = z * 10;
        const frecuenciaX = x * 10;

        ref.current.position.z = z+Math.cos(clock.getElapsedTime() * frecuenciaZ) * 1;
        ref.current.position.x = Math.cos(clock.getElapsedTime() * frecuenciaX) * 1; */
    });

    const PATH = "/assets/textures/shapes/cylinder/";
    const propsTexture = useTexture({
        map: PATH + "celandine_01_diff_1k.jpg",
        normalMap: PATH + "celandine_01_nor_gl_1k.jpg",
        roughnessMap: PATH + "celandine_01_rough_1k.jpg",
        alphaMap: PATH + "celandine_01_alpha_1k.png",
    });

    return (
        <Cylinder ref={ref} args={[0.5, 0.5, 2, 32]} position={[x, y, z]}>
            <meshStandardMaterial  {...propsTexture} />
        </Cylinder>
    );
};


export default CylinderShape;