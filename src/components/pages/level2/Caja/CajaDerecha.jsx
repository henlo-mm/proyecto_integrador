import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {RigidBody} from "@react-three/rapier"
import {useRef, useState} from "react"

export default function CajaDerecha({position, offset, onCollision}) {
    const cajaDerechaRef = useRef(null)
    const cajaDerechaBodyRef = useRef(null)
    const [shouldReset, setShouldReset] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);

    const {nodes, materials} = useGLTF("/assets/models/caja/caja.glb");

    const amplitude = 25;
    const speed = -20; // velocidad del movimiento
    const initialPositionX = position[0];
    const limitPositionX = -16; // Límite izquierdo
    const resetPositionX = 13; // Posición de reinicio en x

    useFrame(({clock}) => {
        if (cajaDerechaBodyRef.current && !shouldReset) {
            const elapsedTime = clock.getElapsedTime() + offset;
            const moveX = initialPositionX + (elapsedTime * speed) % amplitude;

            cajaDerechaBodyRef.current.setTranslation({
                x: moveX,
                y: cajaDerechaBodyRef.current.translation().y,
                z: cajaDerechaBodyRef.current.translation().z,
            }, true);

            // Comprobar si alcanzó el límite derecho
            if (moveX <= limitPositionX) {
                setShouldReset(true);
            }
        }

        // Reiniciar si se ha alcanzado el límite y no se está reiniciando actualmente
        if (shouldReset && !isResetting) {
            isResetting = true;
            setTimeout(() => {
                cajaDerechaBodyRef.current.setTranslation({
                    x: resetPositionX,
                    y: cajaDerechaBodyRef.current.translation().y,
                    z: cajaDerechaBodyRef.current.translation().z,
                }, true);
                isResetting = false;
                setShouldReset(false);
            }, 0);
        }
    });

    const handleCollisionEnter = (event) => {
        if (!isCooldown && event.rigidBody.userData.name === "wolverine") {
            console.log("Colisión con caja derecha");
            onCollision();
            setIsCooldown(true);
            setTimeout(() => {
                setIsCooldown(false);
            }, 1000); 
        }
    };

    return (
        <RigidBody ref={cajaDerechaBodyRef} type="fixed" position={position} onCollisionEnter={handleCollisionEnter}>
            <group ref={cajaDerechaRef} dispose={null}>
                <group name="Scene">
                    <group name="Rigid">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Caja.geometry}
                            material={materials['Small_Wooden_Box.01']}
                        />
                    </group>
                </group>
            </group>
        </RigidBody>
    )
}

useGLTF.preload("/assets/models/caja/caja.glb");