import { Box, useTexture } from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const BoxShape = ({x, y, z}) => {
    const ref = useRef();

    useFrame(({clock}) => {
        const frecuencia = x * 0.1;
        ref.current.position.x = Math.sin(clock.getElapsedTime() * frecuencia) * 4.5;
    });

    const PATH = "/assets/textures/shapes/box/";
    const propsTexture = useTexture({
        map: PATH + "street_rat_diff_1k.jpg",
        normalMap: PATH + "street_rat_nor_gl_1k.jpg",
        roughnessMap: PATH + "street_rat_rough_1k.jpg",
        displacementMap: PATH + "street_rat_sss_1k.png",
    });

    return (
        <Box ref={ref} args={[1, 1, 1]} position={[x, y, z]}>
            <meshStandardMaterial  {...propsTexture} />
        </Box>
    );
};


export default BoxShape;