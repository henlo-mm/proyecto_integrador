import { Torus, useTexture } from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";


const TorusShape = () => {

    const PATH = "/assets/textures/shapes/torus/";
    const propsTexture = useTexture({
        map: PATH + "gray_rocks_diff_1k.jpg",
        normalMap: PATH + "gray_rocks_nor_gl_1k.jpg",
        roughnessMap: PATH + "gray_rocks_rough_1k.jpg",
        displacementMap: PATH + "gray_rocks_disp_1k.png",
    });

  
    const ref = useRef();

    useFrame(({clock}) => {
        ref.current.position.x = Math.cos(clock.getElapsedTime()) * 3;
        ref.current.position.z = 35-Math.sin(clock.getElapsedTime()) * 5;
    });

    return (
        <Torus ref={ref} args={[1, 0.4, 16, 100]} position={[0, 0.5, 40]}>
            <meshStandardMaterial  {...propsTexture} />
        </Torus>
    );
};


export default TorusShape;