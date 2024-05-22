import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {RigidBody} from "@react-three/rapier"
import {useRef, useState} from "react"

export default function CajaIzquierda({position, offset}) {
    const cajaIzquierdaRef = useRef(null)
    const cajaIzquierdaBodyRef = useRef(null)
    const [shouldReset, setShouldReset] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const {nodes, materials} = useGLTF("/assets/models/caja/caja.glb");

    const amplitude = 25;
    const speed = 20; // velocidad del movimiento
    const initialPositionX = position[0];
    const limitPositionX = 13; // Límite izquierdo
    const resetPositionX = -16; // Posición de reinicio en x

    useFrame(({clock}) => {
        if (cajaIzquierdaBodyRef.current && !shouldReset) {
            const elapsedTime = clock.getElapsedTime() + offset;
            const moveX = initialPositionX + (elapsedTime * speed) % amplitude;

            cajaIzquierdaBodyRef.current.setTranslation({
                x: moveX,
                y: cajaIzquierdaBodyRef.current.translation().y,
                z: cajaIzquierdaBodyRef.current.translation().z,
            }, true);

            // Comprobar si alcanzó el límite derecho
            if (moveX >= limitPositionX) {
                setShouldReset(true);
            }
        }

        // Reiniciar si se ha alcanzado el límite y no se está reiniciando actualmente
        if (shouldReset && !isResetting) {
            isResetting = true;
            setTimeout(() => {
                cajaIzquierdaBodyRef.current.setTranslation({
                    x: resetPositionX,
                    y: cajaIzquierdaBodyRef.current.translation().y,
                    z: cajaIzquierdaBodyRef.current.translation().z,
                }, true);
                isResetting = false;
                setShouldReset(false);
            }, 0);
        }
    });

    return (
        <RigidBody ref={cajaIzquierdaBodyRef} type="fixed" position={position}>
            <group ref={cajaIzquierdaRef} dispose={null}>
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