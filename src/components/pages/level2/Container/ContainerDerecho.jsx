import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {RigidBody} from "@react-three/rapier"
import {useRef, useState} from "react"

export default function ContainerDerecho({position, offset, rotation}) {
    const containerDerechoRef = useRef(null)
    const containerDerechoBodyRef = useRef(null)
    const [shouldReset, setShouldReset] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const {nodes, materials} = useGLTF("/assets/models/container/Container.glb");

    const amplitude = 22;
    const speed = -20; // velocidad del movimiento
    const initialPositionX = position[0];
    const limitPositionX = -16; // Límite izquierdo
    const resetPositionX = 13; // Posición de reinicio en x

    useFrame(({clock}) => {
        if (containerDerechoBodyRef.current && !shouldReset) {
            const elapsedTime = clock.getElapsedTime() + offset;
            const moveX = initialPositionX + (elapsedTime * speed) % amplitude;

            containerDerechoBodyRef.current.setTranslation({
                x: moveX,
                y: containerDerechoBodyRef.current.translation().y,
                z: containerDerechoBodyRef.current.translation().z,
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
                containerDerechoBodyRef.current.setTranslation({
                    x: resetPositionX,
                    y: containerDerechoBodyRef.current.translation().y,
                    z: containerDerechoBodyRef.current.translation().z,
                }, true);
                isResetting = false;
                setShouldReset(false);
            }, 0);
        }
    });

    return (
        <RigidBody ref={containerDerechoBodyRef} type="fixed" position={position}>
            <group ref={containerDerechoRef} dispose={null} scale={0.01} rotation={rotation}>
                <group name="Scene">
                    <group name="Rigid">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Container.geometry}
                            material={materials['Material.001']}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={[165.535, 607.601, 165.535]}
                        />
                    </group>
                </group>
            </group>
        </RigidBody>
    )
}

useGLTF.preload("/assets/models/container/Container.glb");