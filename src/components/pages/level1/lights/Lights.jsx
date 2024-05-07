import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { Color, DirectionalLightHelper } from "three";

const Lights = () => {
    const lightRef = useRef();
    /* useHelper(lightRef, DirectionalLightHelper); */
    
    return <>
        <ambientLight
            intensity={1}
        />

        <directionalLight
            ref={lightRef}
            castShadow={true}
            position={[-20, 20, 20]}
            color={new Color("#FFF700")}
            intensity={10}
         /*    shadow-mapSize={[2048, 2048]}
            shadow-camera-far={200}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100} */
        />

    </>
}
export default Lights;