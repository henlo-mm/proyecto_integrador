import { Sphere, useTexture } from '@react-three/drei';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const SphereShape = () => {
    const ref = useRef();

    const amplitud = 5;
    const periodo = 2;
    const alturaSobrePlano = 6;

    useFrame(({clock}) => {
        const tiempo = clock.getElapsedTime();
        const angulo = Math.sin(tiempo / periodo) * Math.PI / 2;

        ref.current.position.x = Math.sin(angulo) * amplitud;
        ref.current.position.y = -Math.cos(angulo) * amplitud + alturaSobrePlano;
        ref.current.position.z = -30;
    });

    const PATH = "/assets/textures/shapes/sphere/";
    const propsTexture = useTexture({
        map: PATH + "grass_medium_01_dry_diff_1k.png",
        normalMap: PATH + "grass_medium_01_nor_gl_1k.jpg",
        roughnessMap: PATH + "grass_medium_01_rough_1k.jpg",
        alphaMap: PATH + "grass_medium_01_alpha_1k.png",
    });

    return (
        <Sphere ref={ref} args={[1, 32, 32]} position={[-4, 0, 0]}>
            <meshStandardMaterial  {...propsTexture} />
        </Sphere>
    );
};


export default SphereShape;