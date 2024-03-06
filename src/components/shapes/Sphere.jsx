import {Sphere} from '@react-three/drei';
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

    return (
        <Sphere ref={ref} args={[1, 32, 32]} position={[-4, 0, 0]}>
            <meshPhongMaterial attach="material" color="#EE82EE" shininess={10}/>
        </Sphere>
    );
};


export default SphereShape;