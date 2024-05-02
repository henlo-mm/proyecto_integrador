import {Environment} from "@react-three/drei";
import React from "react";

export default function Environments() {
    return <>
        <Environment
            files={"/assets/hdris/peppermint_powerplant_4k.hdr"}
            /* files={"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/peppermint_powerplant_4k.hdr"} */
            preset={null}
            background={false}
            ground={{
                height: 20,
                scale: 75,
                radius: 500
            }}
        />
    </>
}