import { BakeShadows, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import { Suspense } from "react";
import { Perf } from "r3f-perf";
import Environments from "./environments/Environments";
import Lights from "./lights/Lights";


const Experience = () => {
   
    return (
        <>
         
            <Perf position="top-left" />
            <BakeShadows />
            <OrbitControls makeDefault /* target={[0, 1, 45]} */ />

            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <World />
            </Suspense>
           
        </>

    )
}

export default Experience;