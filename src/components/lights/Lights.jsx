import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { Color, SpotLightHelper } from "three";

const Lights = () => {
    const spotLightRef = useRef(null);
/*     useHelper(spotLightRef, SpotLightHelper)
 */
    const optionsSpotLight = useMemo(()=>{
        return {
            intensitySL: {value: 10, min: 0, max: 100, step: 1},
            colorSL: {value: "#FFF700"}
        }
    }, [])

    const {intensitySL, colorSL} = useControls("Spot Light", optionsSpotLight)

    return <>
        <ambientLight
            color={new Color("#8b2323")}
            intensity={1}
        />
        <directionalLight
            castShadow={true}
            position={[2, 80, 0]}
            color={new Color("#8b2323")}
            intensity={2}
            shadow-mapSize = {[2048, 2048]}
            shadow-camera-far = {50}
            shadow-camera-left = {-10}
            shadow-camera-right = {10}
            shadow-camera-top = {10}
            shadow-camera-bottom = {-10}
        />
       {/*  <pointLight
            position={[0, 2, 0]}
            color={new Color("#8b2323")}
            intensity={10}
         /> */}
        {/* <spotLight
            ref={spotLightRef}
            position={[0, 4, 0]}
            angle={Math.PI/2}
            color={colorSL}
            castShadow={true}
            intensity={intensitySL}
            distance={10}
        />
        <hemisphereLight
            position={[2, 40, -2]}
            skyColor={new Color(0xFFFFFF)}
            groundColor={new Color("#8b2323")}
            intensity={3}
        /> */}
    </>
}
export default Lights;