import { Center, Text3D } from "@react-three/drei";
import { useState } from "react";

const WelcomeText = (props) => {

    const text = "DevPool y Codeverine: En Busca de la Regeneración Perdida";

    const [color, setColor] = useState('red');

    return (
     
           <Center
                position={props.position}

            >
                <Text3D
                    font="/assets/fonts/DeadpoolFont.json"
                    bevelEnabled
                    bevelSize={0.005}
                    bevelThickness={0.01}
                    height={0.1}
                    letterSpacing={0.05}
                    outlineColor={0x000000} 
                    outlineWidth={0.005}
                    size={0.5}
                    rotation={props.rotation}
                    onPointerOver={(e) => {
                        setColor("#FFFFFF");
                    }}
                    onPointerOut={(e) => {
                        setColor("red");
                    }}
                    onClick={props.onClick}
                >
                    <meshStandardMaterial color={color} />
                    {text}
                </Text3D>
            </Center>  
 
    )
}


export default WelcomeText;