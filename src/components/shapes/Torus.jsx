import { Torus, useMatcapTexture } from '@react-three/drei';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


const TorusShape = () => {

    const [matcap] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5');

    const ref = useRef();
  
    useFrame(({ clock }) => {
        ref.current.position.x = Math.cos(clock.getElapsedTime()) * 2;
    });
  
    return (
      <Torus ref={ref} args={[1, 0.4, 16, 100]} position={[0, 0.5, 0]}>
        <meshMatcapMaterial matcap={matcap} />
      </Torus>
    );
  };



export default TorusShape;