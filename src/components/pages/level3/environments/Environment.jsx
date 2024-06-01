import {Environment} from "@react-three/drei";
import React from "react";

export default function Environments() {
    return <>
        <Environment
           /*  files={"/assets/hdris/burnt_warehouse_4k.hdr"} */
            files={"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/parking_garage_4k.hdr"}
            preset={null}
            background={false}
            ground={{
                height: 20,
                scale: 100,
                radius: 1000
            }}
        />
    </>
}